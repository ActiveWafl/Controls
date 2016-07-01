/*
 *@namespace Wafl.Controls.DatePicker
 */
Namespace("Wafl.Controls.DatePicker");

Wafl.Controls.DatePicker._dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Wafl.Controls.DatePicker._monthLabels = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
Wafl.Controls.DatePicker._daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/*
 *@class DatePicker
 *@extends Class
 */
Wafl.Controls.DatePicker.DatePicker = Class.extend(
    {
        init: function (textElement, calendarElement, calendarTableBody, titleElement)
        {
            this._currentDate = new Date();
            this._month = this._currentDate.getMonth() + 1;
            this._year = this._currentDate.getFullYear();
            this._day = this._currentDate.getDate();
            this._titleElement = titleElement;
            this._textElement = textElement;
            this._calendarElement = calendarElement;
            this._calendarTable = calendarTableBody;
            this._fadeTimer = null;
            textElement.isFocused = false;
            textElement
                .AddClickHandler(
                    function ()
                    {
                        textElement.isFocused = true;
                        if (calendarElement.style.opacity < 1)
                        {
                            calendarElement.FadeIn(10);
                        }
                    }
                )
                .AddFocusHandler(
                    function ()
                    {
                        textElement.isFocused = true;
                        if (calendarElement.style.opacity < 1)
                        {
                            calendarElement.FadeIn(10);
                        }
                    }
                )
                .AddBlurHandler(
                    function ()
                    {
                        textElement.isFocused = false;
                        if (IsDefined(this._fadeTimer) && this._fadeTimer != null)
                        {
                            clearTimeout(this._fadeTimer);
                        }
                        this._fadeTimer = setTimeout(
                            function ()
                            {
                                if (!textElement.isFocused)
                                {
                                    calendarElement.FadeOut(10,
                                        function ()
                                        {
                                            calendarElement.Hide();
                                        });
                                }
                            }, 200
                            );
                    }
                );
            this._updateTextFromDate();
        },
        SetDate: function (year, month, day)
        {
            this._year = year;
            this._month = month;
            if (!IsDefined(day))
            {
                day = 1;
            }
            this._day = day;
            this._updateTextFromDate();
            this._textElement.Trigger("change");
        },
        SetDateFromTimestamp: function (timestamp)
        {
            if (timestamp && timestamp > 0)
            {
                var d = new Date(timestamp * 1000);
                this.SetDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
            }
        },
        Set_Month: function (month)
        {
            this._month = month;
            this._updateTextFromDate();
        },
        Set_Day: function (day)
        {
            this._day = day;
            this._updateTextFromDate();
        },
        Set_Year: function (year)
        {
            this._year = year;
            this._updateTextFromDate();
        },
        Get_Month: function ()
        {
            return this._month;
        },
        Get_Day: function ()
        {
            return this._day;
        },
        Get_Year: function ()
        {
            return this._year;
        },
        GotoPreviousYear: function ()
        {
            this.Set_Year(this._year - 1);
            this._textElement.focus();
        },
        GotoNextYear: function ()
        {
            this.Set_Year(this._year + 1);
            this._textElement.focus();
        },
        GotoPreviousMonth: function ()
        {
            if (this._month > 1)
            {
                this.Set_Month(this._month - 1);
            } else {
                this._year = this._year - 1;
                this.Set_Month(12);
            }
            this._textElement.focus();
        },
        GotoNextMonth: function ()
        {
            if (this._month < 12)
            {
                this.Set_Month(this._month + 1);
            } else {
                this._year = this._year + 1;
                this.Set_Month(1);
            }
            this._textElement.focus();
        },
        _updateTextFromDate: function ()
        {
            this._textElement.value = this._month + "/" + this._day + "/" + this._year;
            this._titleElement.SetText(Wafl.Controls.DatePicker._monthLabels[this._month - 1] + " " + this._year);
            var firstDay = new Date(this._year, this._month - 1, 1);
            var firstDayOfWeek = firstDay.getDay();
            var monthLength = Wafl.Controls.DatePicker._daysInMonth[this._month - 1];
            if (this._month == 2) { // leapyear/february
                if ((this._year % 4 == 0 && this._year % 100 != 0) || this._year % 400 == 0) {
                    monthLength = 29;
                }
            }

            var newTr;
            var newTd;
            var newA;
            var newDayOfMonth;
            var cellIdx = 0;
            this._calendarTable.RemoveAllRows(false);
            for (var rowIdx = 0; rowIdx < 10; rowIdx++)
            {
                newTr = this._calendarTable.AddRow();
                for (var dayIdx = 0; dayIdx <= 6; dayIdx++)
                {
                    newTd = document.createElement("td");
                    newDayOfMonth = cellIdx - firstDayOfWeek + 1;
                    if (cellIdx < firstDayOfWeek)
                    {
                        newTd.AddClass = "LastMonth";
                        newTd.SetText("");
                    }
                    else if (cellIdx >= (firstDayOfWeek + monthLength))
                    {
                        newTd.AddClass = "NextMonth";
                        newTd.SetText("");
                    }
                    else
                    {
                        newA = document.createElement("a");
                        newA.SetText(newDayOfMonth);
                        newA.href = "";
                        newA.onclick = function () {
                            return false;
                        };
                        newA.dayOfMonth = newDayOfMonth;
                        newA.datePickerObject = this;
                        newA.AddClickHandler(
                            function ()
                            {
                                this.datePickerObject.SetDate(this.datePickerObject._year, this.datePickerObject._month, this.dayOfMonth);
                                return false;
                            }
                        );
                        newTd.appendChild(newA);
                    }
                    newTr.appendChild(newTd);
                    cellIdx++;
                }
                if (cellIdx > (monthLength + firstDayOfWeek))
                {
                    break;
                }
            }
        }
    });