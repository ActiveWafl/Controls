/*
 *@namespace Wafl.Controls.Spinner
 */
Namespace("Wafl.Controls.Spinner");

/*
 *@class Spinner
 *@extends Class
 */
Wafl.Controls.Spinner.Spinner = Class.extend(
    {
        init: function (htmlElement)
        {
            this._minValue = 0;
            this._maxValue = 1000000;
            this._smallStep = 1;
            this._useNativeSpinner = 1;
            this._largeStep = 2;
            this._mouseDownHandle = null;
            this._htmlObject = htmlElement;
            this._changeCallback = null;
            this._changeCallbackParam = null;
            this._initialized = false;
        },
        ChangeValue: function (changeAmount)
        {

            //in case someone has changed the min or max attribute on the html element
            if (this._initialized)
            {
                this._minValue = parseFloat(this._htmlObject.GetAttribute("min"));
                this._maxValue = parseFloat(this._htmlObject.GetAttribute("max"));
            }

            var numericValue = parseFloat(this._htmlObject.value);
            if (!IsNumeric(numericValue))
            {
                numericValue = 0;
            }
            var newValue = numericValue + changeAmount;
            if (newValue < this._minValue)
            {
                this._htmlObject.value = this._minValue;
            }
            else if (newValue > this._maxValue)
            {
                this._htmlObject.value = this._maxValue;
            } else {
                this._htmlObject.value = newValue;
            }
            var e = document.createEvent('Event');
            e.initEvent('change', false, false);
            this._htmlObject.dispatchEvent(e);
        },
        Set_ChangeCallback: function (changeCallback)
        {
            this._changeCallback = changeCallback;
        },
        Set_ChangeCallbackParam: function (changeCallbackParam)
        {
            this._changeCallbackParam = changeCallbackParam;
        },
        Set_MinValue: function (minValue)
        {
            this._minValue = minValue;
        },
        Set_MaxValue: function (maxValue)
        {
            this._maxValue = maxValue;
        },
        Set_SmallStep: function (step)
        {
            this._smallStep = step;
        },
        Set_LargeStep: function (step)
        {
            this._largeStep = step;
        },
        Set_UseNativeSpinner: function (useNativeSpinner)
        {
            if (useNativeSpinner != 0 && useNativeSpinner !== false && useNativeSpinner != null)
            {
                useNativeSpinner = true;
            } else {
                useNativeSpinner = false;
            }
            if (!IsDefined(this._htmlObject.onwheel))
            {
                useNativeSpinner = false;
            }
            this._useNativeSpinner = useNativeSpinner;

            if (!this._initialized)
            {
                if (!DblEj.Util.WebBrowser.GetSupportedInputTypes().Number || !useNativeSpinner || DblEj.Util.WebBrowser.IsIeVariant())
                {
                    this._htmlObject.SetAttribute("type", "text");
                    this._containerDiv = document.createElement("div");
                    this._containerDiv.AddClass("SpinnerContainer");
                    this._upButton = document.createElement("button");
                    this._downButton = document.createElement("button");
                    var buttonPanel = document.createElement("div");
                    var upSpan = document.createElement("i");
                    var downSpan = document.createElement("i");
                    buttonPanel.appendChild(this._upButton);
                    buttonPanel.appendChild(this._downButton);
                    buttonPanel.AddClass("ButtonPanel");
                    this._htmlObject.parentNode.insertBefore(this._containerDiv, this._htmlObject);
                    this._containerDiv.appendChild(this._htmlObject);
                    this._containerDiv.appendChild(buttonPanel);
                    this._containerDiv.style.width = (this._htmlObject.GetAbsoluteSize().Get_X() + 20 + 4) + "px";
                    this._upButton.appendChild(upSpan);
                    this._downButton.appendChild(downSpan);
                    upSpan.AddClass("IconChevronUp");
                    downSpan.AddClass("IconChevronDown");
                    this._upButton.style.lineHeight = "1em";
                    this._upButton.type = "button";
                    this._upButton.tabIndex = -1;
                    this._downButton.style.lineHeight = "1em";
                    this._downButton.style.marginTop = "0px";
                    this._downButton.type = "button";
                    this._downButton.tabIndex = -1;
                    this._upButton.style.height = this._htmlObject.GetAbsoluteSize().Get_Y()/2+"px";
                    this._downButton.style.height = this._htmlObject.GetAbsoluteSize().Get_Y()/2+"px";
                    this._htmlObject.AddChangeHandler(function (event)
                    {
                        var numericValue = parseFloat(this._htmlObject.value);
                        if (numericValue < this._minValue)
                        {
                            numericValue = this._minValue;
                        }
                        if (numericValue > this._maxValue)
                        {
                            numericValue = this._maxValue;
                        }
                        if (IsNumeric(numericValue))
                        {
                            this._htmlObject.value = numericValue;
                        } else {
                            this._htmlObject.value = "";
                        }
                        if (this._changeCallback !== null)
                        {
                            this._changeCallback(this._htmlObject, event, this._changeCallbackParam);
                        }
                    }.Bind(this));
                    this._htmlObject.AddKeyDownHandler(function (event)
                    {
                        if (event.keyCode == 38)
                        {
                            this.ChangeValue(this._smallStep);
                        }
                        else if (event.keyCode == 40)
                        {
                            this.ChangeValue(-this._smallStep);
                        }
                    }.Bind(this));
                    this._upButton.AddClickHandler(function ()
                    {
                        if (this._mouseDownHandle != null)
                        {
                            window.clearInterval(this._mouseDownHandle);
                            this._mouseDownHandle = null;
                        }
                        this.ChangeValue(this._smallStep);
                    }.Bind(this));
                    this._downButton.AddClickHandler(function ()
                    {
                        if (this._mouseDownHandle != null)
                        {
                            window.clearInterval(this._mouseDownHandle);
                            this._mouseDownHandle = null;
                        }
                        this.ChangeValue(-this._smallStep);
                    }.Bind(this));
                    this._downButton.AddMouseDownHandler(function ()
                    {
                        var spinnerObject = this;
                        var timesChanged = 0;
                        this._mouseDownHandle = window.setInterval(
                            function ()
                            {
                                if (timesChanged < 5)
                                {
                                    //provide a delay after the first change so user can lift up finger before it starts rolling value
                                }
                                else if (timesChanged < 20)
                                {
                                    spinnerObject.ChangeValue(-spinnerObject._smallStep);
                                }
                                else
                                {
                                    spinnerObject.ChangeValue(-spinnerObject._largeStep);
                                }
                                timesChanged++;
                            }, 100);
                    }.Bind(this));
                    this._downButton.AddMouseUpHandler(function ()
                    {
                        if (this._mouseDownHandle != null)
                        {
                            window.clearInterval(this._mouseDownHandle);
                            this._mouseDownHandle = null;
                        }
                    }.Bind(this));
                    this._upButton.AddMouseDownHandler(function ()
                    {
                        var spinnerObject = this;
                        var timesChanged = 0;
                        this._mouseDownHandle = window.setInterval(
                            function ()
                            {
                                if ((timesChanged < 5))
                                {
                                    //provide a delay after the first change so user can lift up finger before it starts rolling value
                                }
                                else if (timesChanged < 20)
                                {
                                    spinnerObject.ChangeValue(spinnerObject._smallStep);
                                }
                                else
                                {
                                    spinnerObject.ChangeValue(spinnerObject._largeStep);
                                }
                                timesChanged++;
                            }, 100);
                    }.Bind(this));
                    this._upButton.AddMouseUpHandler(function ()
                    {
                        if (this._mouseDownHandle != null)
                        {
                            window.clearInterval(this._mouseDownHandle);
                            this._mouseDownHandle = null;
                        }
                    }.Bind(this));

                    if (!this._containerDiv.IsShowing())
                    {
                        //find the eldest element that is hidden and watch it for when it becomes visible
                        var parentElem = this._containerDiv;
                        var lastHiddenElement = parentElem;
                        while (!parentElem.IsShowing())
                        {
                            lastHiddenElement = parentElem;
                            parentElem = parentElem.GetParent();
                        }
                        lastHiddenElement.AddHandler("Show", function(e)
                        {
                            this._containerDiv.style.width = (this._htmlObject.GetAbsoluteSize().Get_X() + 20 + 4) + "px";
                            this._upButton.style.height = this._htmlObject.GetAbsoluteSize().Get_Y()/2+"px";
                            this._downButton.style.height = this._htmlObject.GetAbsoluteSize().Get_Y()/2+"px";

                        }.Bind(this));
                    }
                }
                this._initialized = true;
            }
        }
    });