{nocache}
<div style="{$CONTAINER_CSS_STYLE}" class="Dropdown {$CSS_CLASS}" {if $CONTAINER_ID}id="{$CONTAINER_ID}"{/if}>
    <button title="{$BUTTON_TITLE}" id="{$BUTTON_ID}" class="DropdownToggle {$BUTTON_CLASS}" style="{$CSS_STYLE}" onclick="DblEj.EventHandling.Events.StopeEventPropagation(event);DblEj.EventHandling.Events.PreventDefaultEvent(event);this.parentNode.ToggleAttribute('data-open');{$ON_CLICK}return false;">
        {$BUTTON_CAPTION} <b class="Expandable"></b>
    </button>
    <ul class="DropdownMenu{if MENU_CLASS} {$MENU_CLASS}{/if}" style="{$DROPDOWN_STYLE} {if isset($BUTTON_POSITION) && strtolower($BUTTON_POSITION)=="right"}right: 0; left: auto;{/if}">
        {$CONTROL_CONTENTS}
    </ul>
</div>
{/nocache}