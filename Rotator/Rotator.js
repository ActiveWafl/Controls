/*
 *@namespace Wafl.Controls.Rotator
 */
Namespace("Wafl.Controls.Rotator");

/*
 *@class Rotator
 *@extends Class
 */
Wafl.Controls.Rotator.Rotator = Class.extend(
    {
        init: function (rotatorElement)
        {
            this.RotatorElement = rotatorElement;
            this.ActiveRotatorItemIndex = 0;
            this.ActiveRotatorItem = $$("li", rotatorElement)[0];
            this.RotatorItemCount = $$("li", rotatorElement).length;
            this._changeCallback = null;
            $$class("ShowPreviousRotatorItem", "a", rotatorElement)
                .OnEach(function (button)
                {
                    button.AddClickHandler(function () {
                        this.ShowPreviousRotatorItem();
                    }.Bind(this));
                    button.AddMouseInHandler(
                        function () {
                            $class("ShowPreviousRotatorItem", "a", this.RotatorElement).Fade(20, 100);
                        }.Bind(this));
                    button.AddMouseOutHandler(
                        function () {
                            $class("ShowPreviousRotatorItem", "a", this.RotatorElement).Fade(100, 20);
                        }.Bind(this));
                }.Bind(this));
            $$class("ShowNextRotatorItem", "a", rotatorElement)
                .OnEach(function (button)
                {
                    button.AddClickHandler(function () {
                        this.ShowNextRotatorItem();
                    }.Bind(this));
                    button.AddMouseInHandler(
                        function () {
                            $class("ShowNextRotatorItem", "a", this.RotatorElement)
                                .Fade(20, 100);
                        }.Bind(this));
                    button.AddMouseOutHandler(
                        function () {
                            $class("ShowNextRotatorItem", "a", this.RotatorElement)
                                .Fade(100, 20);
                        }.Bind(this));
                }.Bind(this));
        },
        RotatorElement: null,
        RotatorItemCount: null,
        ActiveRotatorItem: null,
        ActiveRotatorItemIndex: -1,
        ShowPreviousRotatorItem: function ()
        {
            if (this.ActiveRotatorItemIndex <= 0)
            {
                this.ActiveRotatorItemIndex = this.RotatorItemCount - 1;
            } else {
                this.ActiveRotatorItemIndex--;
            }
            if (IsDefined(this["ActiveRotatorItem"]))
            {
                this.ActiveRotatorItem.Hide();
            }
            this.ActiveRotatorItem = $$("li", this.RotatorElement)[this.ActiveRotatorItemIndex];
            this.ActiveRotatorItem
                .Show()
                .FadeIn(1);
        },
        ShowNextRotatorItem: function ()
        {
            if (this.ActiveRotatorItemIndex >= (this.RotatorItemCount - 1))
            {
                this.ActiveRotatorItemIndex = 0;
            } else {
                this.ActiveRotatorItemIndex++;
            }
            this.ActiveRotatorItem.Hide();
            this.ActiveRotatorItem = $$("li", this.RotatorElement)[this.ActiveRotatorItemIndex];
            if (IsDefined(this["ActiveRotatorItem"]))
            {
                this.ActiveRotatorItem
                    .Show()
                    .FadeIn(1);
            } else {
                throw "The rotator cannot find the rotator item, likely due to malformed or invalid markup";
            }
        }
    });