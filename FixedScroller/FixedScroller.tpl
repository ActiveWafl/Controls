{nocache}
<script type="text/javascript">
    Start
        (
            function ()
            {
                if ($q("{$PARAMS.FixedElementSelector}") != null)
                {
                    DblEj.UI.Utils.MakeFixedElementScrollable($q("{$PARAMS.FixedElementSelector}"), {if isset($PARAMS.CelieingElementSelector) && $PARAMS.CelieingElementSelector}$q("{$PARAMS.CelieingElementSelector}"){else}null{/if}, {if isset($PARAMS.FloorElementSelector) && $PARAMS.FloorElementSelector}$q("{$PARAMS.FloorElementSelector}"){else}null{/if});
                }
            }
        );
</script>
{/nocache}