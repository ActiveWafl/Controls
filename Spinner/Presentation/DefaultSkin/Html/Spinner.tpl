{nocache}
    {if isset($PARAMS.Prepend) && isset($PARAMS.Append)}
        <div class="Append Prepend">
    {elseif isset($PARAMS.Prepend)}
        <div class="Prepend" tabindex="-1">
    {elseif isset($PARAMS.Append)}
        <div class="Append">
    {/if}

    {if isset($PARAMS.Prepend)}<div>{$PARAMS.Prepend}</div>{/if}
    {if isset($PARAMS.Precision)}
        {if $PARAMS.Precision > 0}
            {capture assign="STEP_FORMAT"}%0{$PARAMS.Precision+2}.{$PARAMS.Precision}f{/capture}
        {else}
            {capture assign="STEP_FORMAT"}%d{/capture}
        {/if}
    {else}
        {assign var="STEP_FORMAT" value="%014.12f"}
    {/if}
    <input autocomplete="off" {if !isset($PARAMS.UseNativeSpinner) || $PARAMS.UseNativeSpinner}{if isset($PARAMS.SmallStep)}step="{$PARAMS.SmallStep|string_format:$STEP_FORMAT}" {elseif isset($PARAMS.LargeStep)}step="{$PARAMS.LargeStep|string_format:$STEP_FORMAT}" {/if}{/if}class="Spinner{if isset($PARAMS.CssClass)} {$PARAMS.CssClass}{/if}" type="{if !isset($PARAMS.UseNativeSpinner) || $PARAMS.UseNativeSpinner}number{else}text{/if}" {if isset($PARAMS.Required)}required="{$PARAMS.Required}" {/if}{if isset($PARAMS.Placeholder)}placeholder="{$PARAMS.Placeholder}" {/if}{if isset($PARAMS.MaxLen)}maxlen="{$PARAMS.MaxLen}" {/if}{if isset($PARAMS.MaxValue)}max="{$PARAMS.MaxValue}" {/if}{if isset($PARAMS.MinValue)}min="{$PARAMS.MinValue}" {/if}{if isset($PARAMS.Id)}id="{$PARAMS.Id}" {/if}{if isset($PARAMS.PostName)}name="{$PARAMS.PostName}" {/if}{if isset($PARAMS.Value)}value="{$PARAMS.Value}" {else}{if !isset($PARAMS.AllowNull) || !$PARAMS.AllowNull}value="0" {/if}{/if}{if isset($PARAMS.Width)}style="width: {$PARAMS.Width};" {/if}{if isset($HTML_ATTRIBUTES)}{$HTML_ATTRIBUTES}{/if} />
    {if isset($PARAMS.Append)}<div>{$PARAMS.Append}</div>{/if}

    {if isset($PARAMS.Prepend)||isset($PARAMS.Append)}
        </div><div style="clear: both;"></div>
    {/if}

    <script type="text/javascript">
        Start
        (
            function ()
            {
                $("{$PARAMS.Id}").SpinnerObject = new Wafl.Controls.Spinner.Spinner($("{$PARAMS.Id}"));
                {if isset($PARAMS.ChangeCallback)}
                    $("{$PARAMS.Id}").SpinnerObject.Set_ChangeCallback({$PARAMS.ChangeCallback});
                {/if}
                {if isset($PARAMS.ChangeCallbackParam)}
                    $("{$PARAMS.Id}").SpinnerObject.Set_ChangeCallbackParam({$PARAMS.ChangeCallbackParam});
                {/if}
                {if isset($PARAMS.MinValue)}
                    $("{$PARAMS.Id}").SpinnerObject.Set_MinValue({$PARAMS.MinValue});
                {/if}
                {if isset($PARAMS.MaxValue)}
                    $("{$PARAMS.Id}").SpinnerObject.Set_MaxValue({$PARAMS.MaxValue});
                {/if}
                {if isset($PARAMS.SmallStep)}
                    $("{$PARAMS.Id}").SpinnerObject.Set_SmallStep({$PARAMS.SmallStep});
                {/if}
                {if isset($PARAMS.LargeStep)}
                    $("{$PARAMS.Id}").SpinnerObject.Set_LargeStep({$PARAMS.LargeStep});
                {/if}
                {if isset($PARAMS.UseNativeSpinner)}
                    $("{$PARAMS.Id}").SpinnerObject.Set_UseNativeSpinner({$PARAMS.UseNativeSpinner});
                {else}
                    $("{$PARAMS.Id}").SpinnerObject.Set_UseNativeSpinner(true);
                {/if}
            }
        );
    </script>
{/nocache}