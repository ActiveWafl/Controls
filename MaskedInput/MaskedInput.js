/*
 *@namespace Wafl.Controls.MaskedInput
 */
Namespace("Wafl.Controls.MaskedInput");

/*
 *@class MaskedInput
 *@extends Class
 */
Wafl.Controls.MaskedInput.MaskedInput = Class.extend(
    {
        init: function (htmlElement, inputFormat, showPlaceholders, value, placeholderFormat)
        {
            this._htmlObject = htmlElement;
            this._changeCallback = null;
            this._changeCallbackParam = null;
            this._containerDiv = document.createElement("div");

            //replace any ranges in the input format with a single char to make it easier to parse this thing out
            var inputFormatCode = inputFormat;
            var literals = new Array();
            var inputs = new Array();
            var outputElements = new Array();

            //remove any ranges to make it easier to parse
            inputFormatCode = inputFormatCode.replace(inputFormatCode.match("\\[.*?]"), "-");

            var currentChars = "";
            var currentChar = "";
            var amInAToken = false;
            var newInput;
            var newElem;

            for (var currentCharIdx = 0; currentCharIdx < inputFormatCode.length; currentCharIdx++)
            {
                currentChar = inputFormatCode[currentCharIdx];
                if (currentChar == "#" || currentChar == "*" || currentChar == "%" || currentChar == "." || currentChar == "?" ||
                    currentChar == "-")
                {
                    if (!amInAToken)
                    {
                        if (currentChars != "")
                        {
                            newElem = document.createElement("span");
                            newElem.appendChild(document.createTextNode(currentChars));
                            literals[literals.length] = currentChars
                            outputElements[outputElements.length] = newElem;
                            currentChars = "";
                        }
                        amInAToken = true;
                    }
                } else {
                    if (amInAToken)
                    {
                        if (currentChars != "")
                        {
                            newInput = document.createElement("input");
                            newInput.placeholder = currentChars;
                            inputs[inputs.length] = newInput;
                            outputElements[outputElements.length] = newInput;
                            newInput.style.width = currentChars.CalculateWidth() + "px";
                            currentChars = "";
                        }
                        amInAToken = false;
                    }
                }
                currentChars += currentChar;
            }

            if (currentChars.length > 0)
            {
                if (amInAToken)
                {
                    newInput = document.createElement("input");
                    newInput.placeholder = currentChars;
                    inputs[inputs.length] = newInput;
                    outputElements[outputElements.length] = newInput;
                    newInput.style.width = currentChars.CalculateWidth() + "px";
                }
                else
                {
                    newElem = document.createElement("span");
                    newElem.appendChild(document.createTextNode(currentChars));
                    outputElements[outputElements.length] = newElem;
                }
            }


            htmlElement.parentNode.insertBefore(this._containerDiv, htmlElement);
            htmlElement.Hide()

            var outputElement;
            var totalWidth = 0;
            for (var outputElemIdx = 0; outputElemIdx < outputElements.length; outputElemIdx++)
            {
                outputElement = outputElements[outputElemIdx];
                this._containerDiv.appendChild(outputElement);
                totalWidth += outputElement.GetAbsoluteSize()
                    .Get_X() +
                    1; //just added one to compensate for wghen too narrtow
            }
            this._containerDiv.AddClass("MaskedInputContainer");
            this._containerDiv.style.width = totalWidth + "px";
            this._containerDiv.style.lineHeight = this._containerDiv.GetAbsoluteSize()
                .Get_Y() +
                "px";

            htmlElement.AddChangeHandler(function (event)
            {
                if (this._changeCallback !== null)
                {
                    this._changeCallback(htmlElement, event, this._changeCallbackParam);
                }
            }.Bind(this));
        },
        Prepend: function (prependString)
        {
            var prependDiv = document.createElement("span");
            prependDiv.className = "AddOn";
            prependDiv.SetText(prependString);
            this._containerDiv.insertBefore(prependDiv, this._htmlObject);
        },
        Append: function (appendString)
        {
            var appendDiv = document.createElement("span");
            appendDiv.className = "AddOn";
            appendDiv.SetText(appendString);
            this._containerDiv.insertBefore(appendDiv, this._htmlObject.nextSibling);
        },
        Set_ChangeCallback: function (changeCallback)
        {
            this._changeCallback = changeCallback;
        },
        Set_ChangeCallbackParam: function (changeCallbackParam)
        {
            this._changeCallbackParam = changeCallbackParam;
        }
    });