<div style="{$CONTAINER_CSS_STYLE}" class="Dropdown {$CSS_CLASS}" id="{$CONTAINER_ID}">
    <button title="{$BUTTON_TITLE}" id="{$BUTTON_ID}" class="DropdownToggle {$BUTTON_CLASS}" style="{$CSS_STYLE}" onclick="this.parentNode.ToggleAttribute('data-open');{$ON_CLICK}return false;">
        {$BUTTON_CAPTION} <b class="Expandable"></b>
    </button>
    <ul class="DropdownMenu" style="{$DROPDOWN_STYLE} {if isset($BUTTON_POSITION) && strtolower($BUTTON_POSITION)=="right"}right: 0; left: auto;{/if}">
        {$CONTROL_CONTENTS}
    </ul>
</div>