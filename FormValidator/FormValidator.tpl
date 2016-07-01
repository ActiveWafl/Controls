{if isset($PARAMS.PassCaption)}
    <i class="{$PARAMS.PassCssClass} FormValidationIcon" id="{$PARAMS.ElementId}Pass" title="{$PARAMS.PassCaption}"></i>
{elseif isset($PARAMS.DataLabel)}
    <i class="{$PARAMS.PassCssClass} FormValidationIcon" id="{$PARAMS.ElementId}Pass" title="Valid {$PARAMS.DataLabel} entered"></i>
{else}
    <i class="{$PARAMS.PassCssClass} FormValidationIcon" id="{$PARAMS.ElementId}Pass" title="Data validation succeeded"></i>
{/if}

{if isset($PARAMS.FailCaption)}
    <i class="{$PARAMS.FailCssClass} FormValidationIcon" id="{$PARAMS.ElementId}Fail" title="{$PARAMS.FailCaption}"></i>
{elseif isset($PARAMS.DataLabel)}
    <i class="{$PARAMS.FailCssClass} FormValidationIcon" id="{$PARAMS.ElementId}Fail" title="Please enter a valid {$PARAMS.DataLabel}"></i>
{else}
    <i class="{$PARAMS.FailCssClass} FormValidationIcon" id="{$PARAMS.ElementId}Fail" title="Data validation failed"></i>
{/if}

<script type="text/javascript">
    Start
        (
            function ()
            {

                var validatorObject =
                    new Wafl.Controls.FormValidator.FormValidator("{$PARAMS.Type}", $("{$PARAMS.ElementId}"), "{$PARAMS.ElementId}Pass", "{$PARAMS.ElementId}Fail", "{$PARAMS.DataLabel}", "{$PARAMS.PassCssClass}", "{$PARAMS.FailCssClass}", "{$PARAMS.MinValue}",
                        "{$PARAMS.MaxValue}", {$PARAMS.MinLength}, {$PARAMS.MaxLength}, {$PARAMS.ClientValidator}, {$PARAMS.ServerValidator}, {$PARAMS.DecimalPrecision}, /{$PARAMS.Regex|unescape:"htmlall"}/, "{$PARAMS.FailCaption|escape:"javascript"}");
            }
        );
</script>