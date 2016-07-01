/*
 *@namespace Wafl.Controls.Docking
 */
Namespace("Wafl.Controls.FormValidator");

Wafl.Controls.FormValidator.VALIDATION_STRING = "STRING";
Wafl.Controls.FormValidator.VALIDATION_NUMERIC = "NUMERIC";
Wafl.Controls.FormValidator.VALIDATION_INTEGER = "INTEGER";
Wafl.Controls.FormValidator.VALIDATION_ALPHANUMERIC = "ALPHANUMERIC";
Wafl.Controls.FormValidator.VALIDATION_ALPHA = "ALPHA";
Wafl.Controls.FormValidator.VALIDATION_EMAILADDRESS = "EMAILADDRESS";
Wafl.Controls.FormValidator.VALIDATION_URI = "URI";
Wafl.Controls.FormValidator.VALIDATION_WEBURL = "WEBURL";
Wafl.Controls.FormValidator.VALIDATION_PHONENUMBER = "PHONENUMBER";
Wafl.Controls.FormValidator.VALIDATION_IPV4ADDRESS = "IPV4ADDRESS";
Wafl.Controls.FormValidator.VALIDATION_REGEX = "REGEX";
Wafl.Controls.FormValidator.VALIDATION_CUSTOM = "CUSTOM";
Wafl.Controls.FormValidator.ValidationTypes = [Wafl.Controls.FormValidator.VALIDATION_STRING,
    Wafl.Controls.FormValidator.VALIDATION_NUMERIC,
    Wafl.Controls.FormValidator.VALIDATION_INTEGER,
    Wafl.Controls.FormValidator.VALIDATION_ALPHANUMERIC,
    Wafl.Controls.FormValidator.VALIDATION_ALPHA,
    Wafl.Controls.FormValidator.VALIDATION_EMAILADDRESS,
    Wafl.Controls.FormValidator.VALIDATION_URI,
    Wafl.Controls.FormValidator.VALIDATION_WEBURL,
    Wafl.Controls.FormValidator.VALIDATION_PHONENUMBER,
    Wafl.Controls.FormValidator.VALIDATION_IPV4ADDRESS,
    Wafl.Controls.FormValidator.VALIDATION_REGEX,
    Wafl.Controls.FormValidator.VALIDATION_CUSTOM];
/*
 *@class Docking
 *@extends Class
 */
Wafl.Controls.FormValidator.FormValidator = Class.extend(
    {
        inputElement: null,
        validationType: null,
        dataLabel: null,
        passIconElementId: null,
        failIconElementId: null,
        passCssClass: null,
        failCssClass: null,
        minValue: null,
        maxValue: null,
        minLength: null,
        maxLength: null,
        clientValidator: null,
        serverValidator: null,
        decimalPrecision: null,
        failCaption: null,
        regex: null,
        init: function (validationType, inputElement, passIconElementId, failIconElementId, dataLabel, passCssClass, failCssClass, minValue,
            maxValue, minLength, maxLength, clientValidator, serverValidator, decimalPrecision, regex, failCaption)
        {
            validationType = validationType.toUpperCase();
            if (!IsDefined(validationType))
            {
                throw ("The validation type was not passed into the form validator");
            }
            if (Wafl.Controls.FormValidator.ValidationTypes.indexOf(validationType) == -1)
            {
                throw ("Invalid validation type (" + validationType + ") passed into the form validator");
            }
            this.inputElement = inputElement;
            this.validationType = validationType;
            this.dataLabel = dataLabel;
            this.passIconElementId = passIconElementId;
            this.failIconElementId = failIconElementId;
            this.passCssClass = passCssClass;
            this.failCssClass = failCssClass;
            this.minValue = minValue;
            this.maxValue = maxValue;
            this.minLength = minLength;
            this.maxLength = maxLength;
            this.clientValidator = clientValidator;
            this.serverValidator = serverValidator;
            this.decimalPrecision = decimalPrecision;
            this.regex = regex;
            this.failCaption = failCaption;

            if (validationType == Wafl.Controls.FormValidator.VALIDATION_REGEX)
            {
                //requires: regex
                if (!IsDefined(this.regex) || !this.regex)
                {
                    throw "The Regex validator requires the \"regex\" argument"
                }
            }
            if (validationType == Wafl.Controls.FormValidator.VALIDATION_CUSTOM)
            {
                //requires one or both: clientvalidator, servervalidator
                //optional minValue, maxValue, minLength, maxLength
                if ((!IsDefined(this.clientvalidator) || !this.clientvalidator) && (!IsDefined(this.servervalidator) ||
                    !this.servervalidator))
                {
                    throw "The Custom validator requires either the \"clientValidator\" or the \"serverValidator\" argument (or both)";
                }
            }
            this.inputElement.AddKeyUpHandler(
                function (event)
                {
                    this.inputElement.AddClass("InputStarted");
                    this.ValidateFormField();
                }.Bind(this)
                );
            this.inputElement.AddChangeHandler(
                function (event)
                {
                    this.inputElement.AddClass("InputStarted");
                    this.ValidateFormField();
                }.Bind(this));

            this.inputElement.AddBlurHandler(
                function (event)
                {
                    this.ValidateFormField();
                }.Bind(this));

            var parentForm = IsDefined(this.inputElement.form)?this.inputElement.form:this.inputElement.FindClosest("form");
            if (parentForm != null)
            {
                var submitButton = $q("button[type='submit']", parentForm);
                if (submitButton)
                {
                    submitButton.AddClickHandler(
                        function (event)
                        {
                            this.ValidateFormField();
                        }.Bind(this));
                }
            }
            this.ValidateFormField(false);
        },
        ValidateFormField: function (showIndicators)
        {
            if (!IsDefined(showIndicators))
            {
                showIndicators = true;
            }
            var isValid = false;
            var failReason = "";
            var isEmpty = this.inputElement.value == "";
            if (!isEmpty || this.inputElement.required)
            {
                if (this.inputElement.required && (this.inputElement.value == ""))
                {
                    isValid = false;
                    failReason = "this field is required";
                } else {
                    switch (this.validationType.toUpperCase())
                    {
                        case Wafl.Controls.FormValidator.VALIDATION_ALPHA:
                            this.regex = /[a-zA-Z]+/;
                            isValid = this.inputElement.value.match(this.regex) ? true : false;
                            failReason = "must be letters only";
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_ALPHANUMERIC:
                            this.regex = /[a-zA-Z0-9]+/;
                            isValid = this.inputElement.value.match(this.regex) ? true : false;
                            failReason = "must be alpha-numeric";
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_EMAILADDRESS:
                            isValid = DblEj.Util.StringValidator.CheckEmailAddress(this.inputElement.value);
                            failReason = "invalid email address";
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_INTEGER:
                            var intVal = parseInt(this.inputElement.value);
                            isValid = !isNaN(intVal) && isFinite(this.inputElement.value);
                            failReason = "must be an integer";

                            if (isValid && (this.minValue != null))
                            {
                                isValid = intVal >= this.minValue;
                                failReason = "cannot be less than " + this.minValue;
                            }
                            if (isValid && (this.maxValue != null))
                            {
                                isValid = intVal <= this.maxValue;
                                failReason = "cannot be more than " + this.maxValue;
                            }
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_IPV4ADDRESS:
                            this.regex = /^[1-9]*[0-9]{1,2}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
                            this.inputElement.pattern = "^[1-9]*[0-9]{1,2}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}";
                            isValid = this.inputElement.value.match(this.regex) ? true : false;
                            failReason = "invalid ip (v4) address";
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_NUMERIC:
                            var floatVal = parseFloat(this.inputElement.value);
                            isValid = !isNaN(floatVal) && isFinite(this.inputElement.value);
                            failReason = "must be numeric";
                            if (isValid && (this.minValue != null))
                            {
                                isValid = floatVal >= this.minValue;
                                failReason = "cannot be less than " + this.minValue;
                            }
                            if (isValid && (this.maxValue != null))
                            {
                                isValid = floatVal <= this.maxValue;
                                failReason = "cannot be more than " + this.maxValue;
                            }
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_PHONENUMBER:
                            isValid = true;
                            if (this.minLength !== null)
                            {
                                if (this.inputElement.value.length < this.minLength)
                                {
                                    isValid = false;
                                    failReason = "phone number isn't long enough";
                                }
                            }
                            if (this.maxLength == null)
                            {
                                if (this.inputElement.value.length > this.maxLength)
                                {
                                    isValid = false;
                                    failReason = "phone number is too long";
                                }
                            }
                            if (isValid)
                            {
                                this.regex =
                                    /\+?\(?[0-9]*\)?\+?x?[\- ]?\(?[0-9]*\)?\+?x?[\- ]?\(?[0-9]*\)?\+?x?[\- ]?[0-9\-()x\+]+$/;
                                isValid = this.inputElement.value.match(this.regex) ? true : false;
                                failReason = "invalid phone number";
                            }
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_STRING:
                            isValid = true;
                            if (this.minLength !== null)
                            {
                                if (this.inputElement.value.length < this.minLength)
                                {
                                    isValid = false;
                                    failReason = "string is too short";
                                }
                            }
                            if (this.maxLength == null)
                            {
                                if (this.inputElement.value.length > this.maxLength)
                                {
                                    isValid = false;
                                    failReason = "string is too long";
                                }
                            }
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_URI:
                            this.regex = /[a-zA-Z0-9]*:\/\/[a-zA-Z0-9]*\.?[a-z]*/;
                            isValid = this.inputElement.value.match(this.regex) ? true : false;
                            failReason = "invalid uri";
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_WEBURL:
                            this.regex = /https*:\/\/[a-zA-Z0-9]*\.?[a-z]*/;
                            isValid = this.inputElement.value.match(this.regex) ? true : false;
                            failReason = "invalid url";
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_REGEX:
                            isValid = this.inputElement.value.match(this.regex) ? true : false;
                            failReason = "pattern doesn't match";
                            break;
                        case Wafl.Controls.FormValidator.VALIDATION_CUSTOM:
                            break;
                        default:
                            throw "Cannot validate form field of unknown type: " + this.validationType;
                            break;
                    }
                    if (isValid)
                    {
                        if (this.minLength !== null)
                        {
                            if (this.inputElement.value.length < this.minLength)
                            {
                                isValid = false;
                                failReason = "value isn't long enough";
                            }
                        }
                        if (this.maxLength == null)
                        {
                            if (this.inputElement.value.length > this.maxLength)
                            {
                                isValid = false;
                                failReason = "value number is too long";
                            }
                        }
                    }

                }
            } else {
                isValid = true; //the input is empty, but its not required, so its valid
            }
            if (showIndicators)
            {
                if (isValid)
                {
                    if (isEmpty)
                    {
                        $(this.passIconElementId).Hide(); //dont show the green check for empty items, even if they are valid as such... it just looks wrong
                        $(this.failIconElementId).Hide();
                    } else {
                        $(this.passIconElementId).Show();
                        $(this.failIconElementId).Hide();
                    }
                } else {
                    $(this.passIconElementId).Hide();
                    $(this.failIconElementId).Show();
                }
            }
            if (!isValid)
            {
                this.inputElement.AddClass("Invalid");
                this.inputElement.RemoveClass("Valid");
                if (this.failCaption != "" && this.failCaption)
                {
                    this.inputElement.SetValidationError(this.failCaption, showIndicators);
                } else {
                    this.inputElement.SetValidationError(failReason, showIndicators);
                }
            } else {
                this.inputElement.AddClass("Valid");
                this.inputElement.RemoveClass("Invalid");
                this.inputElement.ClearValidationError();
            }
            for (var validateHandlerIdx = 0; validateHandlerIdx <
                this.inputElement._validatedHandlers.length; validateHandlerIdx++)
            {
                this.inputElement._validatedHandlers[validateHandlerIdx]();
            }
            return isValid;
        }
    });

Wafl.Controls.FormValidator.FormValidator.Initialize =
    function ()
    {
    };