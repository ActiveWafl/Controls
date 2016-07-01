/*
 *@namespace Wafl.Controls.Captcha
 */
Namespace("Wafl.Controls.Captcha");

/*
 *@class Captcha
 *@extends Class
 */
Wafl.Controls.Captcha.Captcha = Class.extend(
    {
        imageElement: null,
        resetAction: null,
        loadHandler: null,
        init: function (imgElem, resetAction, loadingAniUri)
        {
            this.imageElement = imgElem;
            this.resetAction = resetAction;
            if ((this.imageElement.GetAttribute("src") == loadingAniUri) || this.imageElement.GetAttribute("src") == "")
            {
                this.imageElement.src = "/CaptchaImage.gif?" + this.resetAction + "=1&d=" + (new Date()).getTime();
            }
            this.loadHandler = this.imageElement.AddLoadHandler(
                function ()
                {
                    if ((this.imageElement.GetAttribute("src") == loadingAniUri) || this.imageElement.GetAttribute("src") == "")
                    {
                        this.imageElement.src = "/CaptchaImage.gif?" + this.resetAction + "=1&d=" + (new Date()).getTime();
                    }
                }.Bind(this)
            );
            this.imageElement.ResetCaptcha =
                function ()
                {
                    this.imageElement.src = loadingAniUri;
                }.Bind(this);

        }
    });