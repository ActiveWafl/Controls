/*
 *@namespace Wafl.Controls.DropdownButton
 */
Namespace("Wafl.Controls.AutoComplete");

/*
 *@class DropdownButton
 *@extends Class
 */
Wafl.Controls.AutoComplete.AutoComplete = Class.extend(
    {
        init: function (inputControl)
        {
            this._autoCompleteTimer = null;
            this._lastSearchString = null;
            Start
                (
                    function ()
                    {
                        inputControl.AddKeyUpHandler(
                            function(event)
                            {
                                if (inputControl.Get_Value().length == 3)
                                {
                                    if (this._autoCompleteTimer != null)
                                    {
                                        window.clearTimeout(this._autoCompleteTimer);
                                        this._autoCompleteTimer = null;
                                    }
                                    this._autoCompleteTimer = window.setTimeout(
                                        function()
                                        {
                                            this._autoCompleteTimer = null;
                                            
                                            var api = inputControl.GetData("source-api");
                                            var apiVar = inputControl.GetData("source-api-argname");
                                            if (api != "" && api != null)
                                            {
                                                if (inputControl.Get_Value() != this._lastSearchString)
                                                {
                                                    this._lastSearchString = inputControl.Get_Value();
                                                    var reqObject = {};
                                                    reqObject[apiVar] = inputControl.Get_Value();
                                                    _(api, reqObject, "", function(responseObject)
                                                    {
                                                        if (this._autoCompleteTimer == null)
                                                        {
                                                            var datalist = inputControl.FindClosest("datalist");
                                                            datalist.RemoveAllChildren();
                                                            for (var responseIdx = 0; responseIdx < responseObject.length; responseIdx++)
                                                            {
                                                                if (IsArray(responseObject[responseIdx]))
                                                                {
                                                                    //0=displayvalue, 1=value, 2=idtype (optional.  describes what the value is an id of)
                                                                    var newOption = new Option(responseObject[responseIdx][0]);

                                                                    if (responseObject[responseIdx].length > 1)
                                                                    {
                                                                        newOption.SetData("id-val", responseObject[responseIdx][1]);
                                                                    }
                                                                    if (responseObject[responseIdx].length > 2)
                                                                    {
                                                                        newOption.SetData("id-type", responseObject[responseIdx][2]);
                                                                    }
                                                                }
                                                                else if (IsObject(responseObject[responseIdx]))
                                                                {
                                                                    var newOption = new Option(responseObject[responseIdx]["DisplayText"]);
                                                                    if (IsDefined(responseObject[responseIdx]["Value"]))
                                                                    {
                                                                        newOption.SetData("id-val", responseObject[responseIdx]["Value"]);
                                                                    }
                                                                    if (IsDefined(responseObject[responseIdx]["ValueType"]))
                                                                    {
                                                                        newOption.SetData("id-type", responseObject[responseIdx]["ValueType"]);
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    var newOption = new Option(responseObject[responseIdx]);
                                                                }
                                                                datalist.AppendChild(newOption);
                                                            }
                                                        }
                                                    }.Bind(this));
                                                }
                                            }
                                        }.Bind(this), 100);
                                }
                                else if (inputControl.Get_Value().length < 3)
                                {
                                    if (this._autoCompleteTimer != null)
                                    {
                                        window.clearTimeout(this._autoCompleteTimer);
                                        this._autoCompleteTimer = null;
                                    }
                                    var datalist = inputControl.FindClosest("datalist");
                                    datalist.RemoveAllChildren();
                                    this._lastSearchString = "";
                                }
                            }.Bind(this));
                    }.Bind(this)
                );
        }
    });