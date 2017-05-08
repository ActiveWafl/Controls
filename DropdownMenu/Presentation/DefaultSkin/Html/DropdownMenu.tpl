{nocache}
<li class="Dropdown {$ITEM_CLASS}">
    <a href="" class="DropdownToggle{if $BUTTON_CLASS} {$BUTTON_CLASS}{/if}" onclick="this.parentNode.ToggleAttribute('data-open');return false;">{$MENU_CAPTION} <i class="IconChevronDown"></i></a>
    <ul class="DropdownMenu">
        {$CONTROL_CONTENTS}
    </ul>
</li>
{/nocache}