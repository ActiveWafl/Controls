/*
 *@namespace Wafl.Controls.Timeline
 */
Namespace("Wafl.Controls.Timeline");

/*
 *@class Timeline
 *@extends Class
 */
Wafl.Controls.Timeline.Timeline = Class.extend(
    {
        init: function (htmlElement)
        {
            this._containerDiv = document.createElement("div");
            this._htmlObject = htmlElement;
            this._progressBar = null;
            this._timelineBar = null;
            this._expectedProgressBar = null;
            this._eventClickCallback = null;
            this._events = new Array();
            this._eventElements = new Array();
            this._timelineWidth = 0;
            this._totalTimeSpan = 0;
            this._viewInterval = Wafl.Controls.Timeline.VIEW_INTERVAL_HOURLY;
            this._actualProgress = 0;

        },
        Set_Events: function (events)
        {
            this._events = events;
            Iteratize(this._events);
            this.RenderEvents();
        },
        AddEvent: function (event)
        {
            this._events[this._events.length] = event;
        },
        RenderEvents: function ()
        {
            this._eventElements = new Array();
            if (this._events.length > 0)
            {
                this._events.sort(Wafl.Controls.Timeline.EventTimeStampComparison);
                this._htmlObject.SetCss("width", "inherit");

                var startDate = new Date(this._events[0].TimeStamp * 1000);
                var endDate = new Date(this._events[this._events.length - 1].TimeStamp * 1000);
                var currentDate = new Date();
                var endDateOffset = endDate.getTime() - startDate.getTime();
                var currentDateOffset = currentDate.getTime() - startDate.getTime();
                var expectedProgressPercent = 0;
                if (currentDate >= endDate)
                {
                    expectedProgressPercent = 100;
                } else {
                    expectedProgressPercent = currentDateOffset * 100 / endDateOffset;
                }
                this._totalTimeSpan = (endDate.getTime() - startDate.getTime()) / 1000;

                this._events.OnEach(
                    function (event)
                    {
                        var newElem = document.createElement("div");
                        newElem
                            .SetText("")
                            .AddClass("Milestone")
                            .AddClickHandler(
                                function ()
                                {
                                    this._eventClickCallback(event, newElem);
                                }.Bind(this));
                        if (IsDefined(event.ClassName) && event.ClassName)
                        {
                            newElem.AddClass(event.ClassName)
                        }

                        newElem.TimelineEvent = event;
                        this._eventElements[this._eventElements.length] = newElem;
                    }.Bind(this));
                this._htmlObject.ReplaceAllChildren(this._eventElements);

                if (this._eventElements.length > 0)
                {
                    var firstMilestoneElem = this._eventElements[0];
                    var firstMilestoneSize = firstMilestoneElem.GetAbsoluteSize();
                    this._timelineWidth = this._htmlObject.GetAbsoluteSize()
                        .Get_X() -
                        firstMilestoneSize.Get_X();
                    this._htmlObject.SetCss("width", (this._timelineWidth) + "px");
                    this._htmlObject.SetCss("left", (firstMilestoneSize.Get_X() / 2) + "px");

                    this._eventElements.OnEach
                        (
                            function (elem)
                            {
                                var newElemRelativeTime = elem.TimelineEvent.TimeStamp - (startDate.getTime() / 1000);
                                var newElemLeft = newElemRelativeTime * this._timelineWidth / this._totalTimeSpan;
                                elem.SetCssX(newElemLeft - firstMilestoneSize.Get_X() / 2);
                                if (elem.TimelineEvent.Tooltip)
                                {
                                    if ($(elem.TimelineEvent.Tooltip))
                                    {
                                        elem.SetTooltip($(elem.TimelineEvent.Tooltip).innerHTML, "auto", "#44679A", 0);
                                    } else {
                                        elem.SetTooltip(elem.TimelineEvent.Tooltip, "auto", "#44679A", 0);
                                    }
                                }
                            }.Bind(this));
                }
                this._progressBar = document.createElement("div");
                this._expectedProgressBar = document.createElement("div");
                this._timelineBar = document.createElement("div");
                this._progressBar.AddClass("TimelineProgressBar")
                    .AddClass("Actual");
                this._expectedProgressBar.AddClass("TimelineProgressBar")
                    .AddClass("Expected");
                this._timelineBar.AddClass("TimelineAxis");
                this._htmlObject.AppendChild(this._progressBar)
                    .AppendChild(this._expectedProgressBar)
                    .AppendChild(this._timelineBar);
                this._expectedProgressBar.SetCss("width", expectedProgressPercent + "%");
                this._progressBar.SetCss("width", this._actualProgress + "%");

                var desiredBigTickCount = 5;
                var tickCount = 0;
                var tickIdx = 0;
                var markDate = new Date(startDate.getTime());
                var testDate = new Date(startDate.getTime());
                if (this._totalTimeSpan == 0)
                {
                }
                else if (this._totalTimeSpan < 172800) //2 days
                {
                    //view interval is hourly
                    this._viewInterval = Wafl.Controls.Timeline.VIEW_INTERVAL_HOURLY;
                    while (testDate <= endDate)
                    {
                        tickCount++;
                        testDate.setHour(testDate.getHour() + 1);
                    }
                    while (tickIdx <= tickCount)
                    {
                        this.DrawTickMark(markDate, startDate, endDate, tickIdx, tickCount, desiredBigTickCount, "hh:mm t");
                        markDate.setHour(markDate.getHour() + 1);
                        tickIdx++;
                    }
                }
                else if (this._totalTimeSpan < 7776000) //90 days
                {
                    //view interval is daily
                    this._viewInterval = Wafl.Controls.Timeline.VIEW_INTERVAL_DAILY;
                    while (testDate <= endDate)
                    {
                        tickCount++;
                        testDate.setDate(testDate.getDate() + 1);
                    }
                    while (tickIdx <= tickCount)
                    {
                        if (tickIdx == 0 || tickIdx == tickCount)
                        {
                            this.DrawTickMark(markDate, startDate, endDate, tickIdx, tickCount, desiredBigTickCount, "MM/dd h:m t");
                        } else {
                            this.DrawTickMark(markDate, startDate, endDate, tickIdx, tickCount, desiredBigTickCount, "MM/dd");
                        }
                        markDate.setDate(markDate.getDate() + 1);
                        tickIdx++;
                    }
                }
                else if (this._totalTimeSpan < 157680000) //5 years
                {
                    //view interval is monthly
                    this._viewInterval = Wafl.Controls.Timeline.VIEW_INTERVAL_MONTHLY;
                    while (testDate <= endDate)
                    {
                        tickCount++;
                        testDate.setMonth(testDate.getMonth() + 1);
                    }
                    while (tickIdx <= tickCount)
                    {
                        if (tickIdx == 0 || tickIdx == tickCount)
                        {
                            this.DrawTickMark(markDate, startDate, endDate, tickIdx, tickCount, desiredBigTickCount, "n d, yyyy");
                        } else {
                            this.DrawTickMark(markDate, startDate, endDate, tickIdx, tickCount, desiredBigTickCount, "n yyyy");
                        }
                        markDate.setMonth(markDate.getMonth() + 1);
                        tickIdx++;
                    }
                }
                else
                {
                    //view interval is yearly
                    this._viewInterval = Wafl.Controls.Timeline.VIEW_INTERVAL_YEARLY;
                    while (testDate <= endDate)
                    {
                        tickCount++;
                        testDate.setFullYear(testDate.getFullYear() + 1);
                    }
                    while (tickIdx <= tickCount)
                    {
                        if (tickIdx == 0 || tickIdx == tickCount)
                        {
                            this.DrawTickMark(markDate, startDate, endDate, tickIdx, tickCount, desiredBigTickCount, "n, yyyy");
                        } else {
                            this.DrawTickMark(markDate, startDate, endDate, tickIdx, tickCount, desiredBigTickCount, "yyyy");
                        }
                        markDate.setFullYear(markDate.getFullYear() + 1);
                        tickIdx++;
                    }
                }
            }
        },
        Set_ActualProgress: function (actualProgress)
        {
            this._actualProgress = actualProgress;
        },
        Set_EventClickCallback: function (eventClickCallback)
        {
            this._eventClickCallback = eventClickCallback;
        },
        DrawTickMark: function (markDate, startDate, endDate, tickIdx, tickCount, bigTickCount, dateFormat)
        {
            var markLeft = 0;
            var tickMark;
            var dateElement;
            var timeOffset;
            var useMarkDate;
            var bigTickForEveryNSmallTicks = Math.floor(tickCount / (bigTickCount - 1));
            tickMark = document.createElement("div");
            if ((tickIdx > 0) && (tickIdx < tickCount))
            {
                useMarkDate = new Date(markDate.getTime());
                if (this._viewInterval == Wafl.Controls.Timeline.VIEW_INTERVAL_HOURLY)
                {
                    useMarkDate.setMinutes(0);
                }
                else if (this._viewInterval == Wafl.Controls.Timeline.VIEW_INTERVAL_DAILY)
                {
                    useMarkDate.setMinutes(0);
                    useMarkDate.setHours(0);
                }
                else if (this._viewInterval == Wafl.Controls.Timeline.VIEW_INTERVAL_MONTHLY)
                {
                    useMarkDate.setMinutes(0);
                    useMarkDate.setHours(0);
                    useMarkDate.setDate(1);
                }
                else if (this._viewInterval == Wafl.Controls.Timeline.VIEW_INTERVAL_YEARLY)
                {
                    useMarkDate.setMinutes(0);
                    useMarkDate.setHours(0);
                    useMarkDate.setDate(1);
                    useMarkDate.setMonth(0);
                }

                timeOffset = (useMarkDate.getTime() - startDate.getTime()) / 1000;
                markLeft = timeOffset * this._timelineWidth / this._totalTimeSpan;
            } else {
                useMarkDate = markDate;
                markLeft = tickIdx * this._timelineWidth / tickCount;
            }

            if (useMarkDate > endDate)
            {
                useMarkDate = endDate;
            }
            tickMark.SetCssX(markLeft);
            tickMark.AddClass("TickMark");
            this._htmlObject.AppendChild(tickMark);
            if ((markDate < endDate) && (tickIdx % bigTickForEveryNSmallTicks > 0))
            {
                tickMark.AddClass("Small");
            } else {
                //sometimes the second to last big tick's label will interfere with last tick because of the nature of the timing
                //or the second big tick will interfere with the first one for the same reason
                //this prevents that by only drawing the label if its more than 60 pixels away from first or lst big tick
                if (
                    ((tickIdx == tickCount) || (markLeft < (this._timelineWidth - 60))) &&
                    ((tickIdx == 0) || (markLeft > 60))
                    )
                {
                    dateElement = document.createElement("div");
                    dateElement.SetText(useMarkDate.ToFormattedString(dateFormat))
                        .AddClass("TickDate");
                    dateElement.SetCssX(markLeft);
                    this._htmlObject.AppendChild(dateElement);
                }
            }
        }
    });
Wafl.Controls.Timeline.VIEW_INTERVAL_HOURLY = 1;
Wafl.Controls.Timeline.VIEW_INTERVAL_DAILY = 2;
Wafl.Controls.Timeline.VIEW_INTERVAL_MONTHLY = 3;
Wafl.Controls.Timeline.VIEW_INTERVAL_YEARLY = 4;

Wafl.Controls.Timeline.EventTimeStampComparison =
    function (a, b) {
        if (a.TimeStamp < b.TimeStamp)
        {
            return -1;
        }
        else if (a.TimeStamp > b.TimeStamp)
        {
            return 1;
        } else {
            return 0;
        }
    };
