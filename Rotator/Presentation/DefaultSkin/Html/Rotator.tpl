{nocache}
    <div class="Rotator{if isset($PARAMS.AutoHideNavButtons) && $PARAMS.AutoHideNavButtons} AutoHide{/if}" style="{if isset($PARAMS.Style)}{$PARAMS.Style}{/if} {if isset($PARAMS.BackgroundImage)}background-image: url('{$PARAMS.BackgroundImage}');{/if} {if isset($HEIGHT)}height: {$HEIGHT}px;{else}height: 400px;{/if} {if isset($PARAMS.padding)}padding: {$PARAMS.padding}px;{/if} {if isset($WIDTH)}width:{$WIDTH}px;{/if}" {if isset($PARAMS.Id)}id="{$PARAMS.Id}"{/if}>
        <ul {if isset($PARAMS.RotateStyle)}class="Layout {$PARAMS.RotateStyle}" {/if}style="overflow: hidden; {if isset($HEIGHT)}height: {$HEIGHT}px;{else}height: 400px;{/if}">
            {$CONTROL_CONTENTS}
        </ul>
    </div>
    <script type="text/javascript">
        Start
            (
                function ()
                {
                    $("{$PARAMS.Id}").RotatorObject = new Wafl.Controls.Rotator.Rotator($("{$PARAMS.Id}"));
                }
            );
    </script>
{/nocache}