/*
 *@namespace Wafl.Controls.Docking
 */
Namespace("Wafl.Controls.Docking");

/*
 *@class Docking
 *@extends Class
 */
Wafl.Controls.Docking.Docking = Class.extend(
    {
        init: function (htmlElement)
        {
        }
    });
Wafl.Controls.Docking.Docking.Initialize = function()
{
    updateDockingControls();
};

function updateDockingControls()
{
    Wafl.Controls.Docking.Docking.totalBottomDockingSize = 0;
    Wafl.Controls.Docking.Docking.totalTopDockingSize = 0;
    Wafl.Controls.Docking.Docking.totalLeftDockingSize = 0;
    Wafl.Controls.Docking.Docking.totalRightDockingSize = 0;

    $$q(".Dock, [data-docked]")
        .OnEach
        (
            function (elem)
            {
                if (!elem.HasClass("First") && !elem.HasClass("Second") && !elem.HasClass("Third") && !elem.HasClass("Fourth")
                    && !elem.HasClass("Fifth") && !elem.HasClass("Last")
                && !elem.HasAttribute("data-dock-order"))
                {
                    elem.SetAttribute("data-dock-order","Last");
                    elem.SetAttribute("data-docked",true);
                }
            }
        );
    dockElementGroup($$q(".Dock.First, [data-docked][data-dock-order=\"1\"]"));
    dockElementGroup($$q(".Dock.Second, [data-docked][data-dock-order=\"2\"]"));
    dockElementGroup($$q(".Dock.Third, [data-docked][data-dock-order=\"3\"]"));
    dockElementGroup($$q(".Dock.Fourth, [data-docked][data-dock-order=\"4\"]"));
    dockElementGroup($$q(".Dock.Fifth, [data-docked][data-dock-order=\"5\"]"));
    dockElementGroup($$q(".Dock.Last, [data-docked][data-dock-order=\"Last\"]"));
}

/**
 * @param {array|nodeList} elements
 * @returns {dockElementGroup}
 */
function dockElementGroup(elements)
{
    elements.OnEach
        (
            function (elem)
            {
                var parent = elem.GetParent();
                var originalParentPaddingTop = parent.GetData("original-padding-top");
                var originalParentPaddingBotton = parent.GetData("original-padding-bottom");
                if (originalParentPaddingTop == null || originalParentPaddingTop == "")
                {
                    originalParentPaddingTop = parseFloat(parent.GetStyle("padding-top"));
                    parent.SetData("original-padding-top", originalParentPaddingTop);
                } else {
                    originalParentPaddingTop = parseFloat(originalParentPaddingTop);
                }
                if (originalParentPaddingBotton == null || originalParentPaddingBotton == "")
                {
                    originalParentPaddingBotton = parseFloat(parent.GetStyle("padding-bottom"));
                    parent.SetData("original-padding-bottom", originalParentPaddingBotton);
                } else {
                    originalParentPaddingBotton = parseFloat(originalParentPaddingBotton);
                }

                if (elem.HasClass("Left") || elem.HasClass("Right") || elem.GetAttribute("data-dock-wall") == "left" || elem.GetAttribute("data-dock-wall") == "right")
                {
                    elem.AddClass("FullHeight");
                }
                if (elem.HasClass("Bottom") || elem.GetAttribute("data-dock-wall") == "bottom")
                {
                    elem.SetCss("margin-bottom", "0px");
                    elem.SetCss("bottom", Wafl.Controls.Docking.Docking.totalBottomDockingSize + "px");
                    var dockClearance = elem.GetAbsoluteSize().Get_Y();
                    Wafl.Controls.Docking.Docking.totalBottomDockingSize += dockClearance;
                    var newPadding = originalParentPaddingTop + dockClearance;
                    parent.SetCss("padding-bottom", newPadding + "px");
                }
                else if (elem.HasClass("Top") || elem.GetAttribute("data-dock-wall") == "top")
                {
                    elem.SetCss("margin-top", "0px");
                    elem.SetCss("top", Wafl.Controls.Docking.Docking.totalTopDockingSize + "px");
                    var dockClearance = elem.GetAbsoluteSize().Get_Y() + parseFloat(elem.GetStyle("margin-bottom"));
                    Wafl.Controls.Docking.Docking.totalTopDockingSize += dockClearance;
                    var newPadding = originalParentPaddingTop + dockClearance;
                    parent.SetCss("padding-top", newPadding + "px");
                }
                else if (elem.HasClass("Left") || elem.GetAttribute("data-dock-wall") == "left")
                {
                    elem.SetCss("margin-left", "0px");
                    Wafl.Controls.Docking.Docking.totalLeftDockingSize += elem.GetAbsoluteSize().Get_X();
                    var padding = parseFloat(elem.GetStyle("padding-left"));
                    padding = padding + parseFloat(elem.GetStyle("padding-rigt"));
                    var elemRightEdge = elem.GetAbsolutePosition().Get_X() + elem.GetAbsoluteSize().Get_X();
                    var diff = parent.GetAbsolutePosition().Get_X() - elemRightEdge;
                    if (diff < 0)
                    {
                        parent.SetCss("padding-left", (diff * -1) + "px");
                    } else {
                        parent.SetCss("padding-left", "0px");
                    }
                }
                else if (elem.HasClass("Right") || elem.GetAttribute("data-dock-wall") == "right")
                {
                    elem.SetCss("margin-right", "0px");
                    Wafl.Controls.Docking.Docking.totalRightDockingSize += elem.GetAbsoluteSize().Get_X();
                    parent.SetCss("padding-right", elem.GetAbsoluteSize().Get_X() + "px");
                    var padding = parseFloat(elem.GetStyle("padding-left"));
                    padding = padding + parseFloat(elem.GetStyle("padding-rigt"));
                    var elemLeftEdge = elem.GetAbsolutePosition().Get_X();
                    var diff = elemLeftEdge - (parent.GetAbsolutePosition().Get_X() + parent.GetAbsoluteSize().Get_X());
                    if (diff < 0)
                    {
                        parent.SetCss("padding-right", (diff * -1) + "px");
                    } else {
                        parent.SetCss("padding-right", "0px");
                    }
                }
                if (elem.HasClass("Left") || elem.HasClass("Right") || elem.GetAttribute("data-dock-wall") == "left" || elem.GetAttribute("data-dock-wall") == "right")
                {
                    //if there are any top docked items make sure we go below them
                    elem._topDockAvoidance = Wafl.Controls.Docking.Docking.totalTopDockingSize;
                    elem.SetCss("margin-top", elem._topDockAvoidance + "px");

                    //if there are any bottom docked items make sure we go above them
                    elem.SetCss("margin-bottom", Wafl.Controls.Docking.Docking.totalBottomDockingSize + "px");
                }
                elem.Show();
                elem.BringToFront($$q(".Dialog"));
            }
        );
    return this;
}

Start(function ()
{
    updateDockingControls();
    DblEj.EventHandling.Events.AddHandler(window, "resize",
        function ()
        {
            updateDockingControls();
        });
}, true);