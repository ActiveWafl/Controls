/*
 *@namespace Wafl.Controls.FullHeight
 */
Namespace("Wafl.Controls.FullHeight");

/*
 *@class FullHeight
 *@extends Class
 */
Wafl.Controls.FullHeight.FullHeight = Class.extend(
    {
        init: function (htmlElement) {
        }
    });

Wafl.Controls.FullHeight.FullHeight.UpdateElements = function ()
{
    $$q(".FullHeight, [data-fullheight]")
        .OnEach
        (
            function (elem)
            {
                elem.SetCss("Height", "auto");
            }
        );
    $$q(".FullHeight, [data-fullheight]")
        .OnEach
        (
            function (elem)
            {
                var grandparent = null;
                var parent = elem.GetParent();
                var parentHeight = parent.GetAbsoluteSize().Get_Y();
                if (parentHeight < elem.GetAbsoluteSize().Get_Y())
                {
                    grandparent = parent.GetParent();
                    parentHeight = grandparent.GetAbsoluteSize().Get_Y();
                }
                if (elem.GetStyle("box-sizing") == "border-box" || elem.GetStyle("-moz-box-sizing") == "border-box")
                {
                    parentHeight = parentHeight - parseFloat(parent.GetStyle("padding-top"));
                    parentHeight = parentHeight - parseFloat(parent.GetStyle("padding-bottom"));
                }
                var viewPortSize = DblEj.UI.Utils.GetPageSize();
                var elemTop = parseFloat(elem.GetCss("Top"));
                var elemBottom = parseFloat(elem.GetCss("Bottom"));
                var offset = elemTop + elemBottom;
                if (parentHeight > viewPortSize.Get_Y())
                {
                    parentHeight = viewPortSize.Get_Y();
                }
                if (!isNaN(offset))
                {
                    parentHeight = parentHeight - offset;
                }
                var elemVerticalMargins = parseFloat(elem.GetStyle("margin-top")) + parseFloat(elem.GetStyle("margin-bottom"));
                var elemNewHeight = parentHeight - elemVerticalMargins;
                elem.SetCss("Height", elemNewHeight + "px");
            }
        );
};

Start
    (
        function ()
        {
            Wafl.Controls.FullHeight.FullHeight.UpdateElements();
            window.AddResizeHandler(function()
            {
               Wafl.Controls.FullHeight.FullHeight.UpdateElements();
            });
        }, true
    );
