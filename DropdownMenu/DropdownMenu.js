/*
 *@namespace Wafl.Controls.DropdownMenu
 */
Namespace("Wafl.Controls.DropdownMenu");

/*
 *@class DropdownMenu
 *@extends Class
 */
Wafl.Controls.DropdownMenu.DropdownMenu = Class.extend({});

Wafl.Controls.DropdownMenu.DropdownMenu.Initialize = function ()
{
    DblEj.EventHandling.Events.AddHandler(document, "click",
        function (event)
        {
            var elem, evt = event;
            if (evt.srcElement)
                elem = evt.srcElement;
            else if (evt.target)
                elem = evt.target;
            $$class("Dropdown")
                .OnEach
                (
                    function (dropdownElem)
                    {
                        if ((dropdownElem !== elem) && (!elem.ContainsAncestor(dropdownElem)))
                        {
                            dropdownElem.RemoveAttribute("data-open");
                            DblEj.EventHandling.Events.StopeEventPropagation(event);
                        }
                    }
                );
        }
    );
};