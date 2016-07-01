/*
 *@namespace Wafl.Controls.DropdownButton
 */
Namespace("Wafl.Controls.DropdownButton");

/*
 *@class DropdownButton
 *@extends Class
 */
Wafl.Controls.DropdownButton.DropdownButton = Class.extend(
    {
        init: function ()
        {
            Start
                (
                    function ()
                    {
                    }
                );
        }
    });

Wafl.Controls.DropdownButton.DropdownButton.Initialize = function ()
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
                        }
                    }
                );
        }
    );
};