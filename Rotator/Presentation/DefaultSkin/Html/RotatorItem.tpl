{nocache}
    <li style="display: block; position: relative; {if isset($PARAMS.Image)}background-image: url({$PARAMS.Image});{/if}{if isset($PARENT_HEIGHT)}height: {$PARENT_HEIGHT}px;{elseif isset($HEIGHT)}height: {$HEIGHT}px;{else}height: 400px;{/if}{if isset($PARENT_WIDTH)}width: {$PARENT_WIDTH}px;{elseif isset($WIDTH)}width: {$WIDTH}px;{elseif isset($WIDTH)}width: {$WIDTH}px;{else}width: 100%;{/if}">
        <a class="RotatorNavButton ShowPreviousRotatorItem" href="" onclick="return false;"
           style="{if isset($PARAMS.BackNavImage)}background-image: url('{$PARAMS.BackNavImage}');{/if} {if isset($PARAMS.NavWidth)}width: {$PARAMS.NavWidth}px;{else}width: 30px;{/if} {if isset($PARAMS.NavHeight)}height: {$PARAMS.NavHeight}px;{else}height: 30px;{/if} {if isset($PARAMS.BackNavX)}left: {$PARAMS.BackNavX}px;{/if}{if isset($PARAMS.BackNavY)}top: {$PARAMS.BackNavY}px;{/if}">{if isset($PARAMS.BackNavCaption)}{$PARAMS.BackNavCaption}{/if}</a>
        <a class="RotatorNavButton ShowNextRotatorItem" href="" onclick="return false;"
           style="{if isset($PARAMS.ForwardNavImage)}background-image: url('{$PARAMS.ForwardNavImage}');{/if} {if isset($PARAMS.NavWidth)}width: {$PARAMS.NavWidth}px;{else}width: 30px;{/if} {if isset($PARAMS.NavHeight)}height: {$PARAMS.NavHeight}px;{else}height: 30px;{/if} {if isset($PARAMS.ForwardNavX)}left: {$PARAMS.ForwardNavX}px;{/if}{if isset($PARAMS.ForwardNavY)}top: {$PARAMS.ForwardNavY}px;{/if}">{if isset($PARAMS.ForwardNavCaption)}{$PARAMS.ForwardNavCaption}{/if}</a>
        {$CONTROL_CONTENTS}
    </li>
{/nocache}