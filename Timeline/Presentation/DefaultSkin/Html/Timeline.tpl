{nocache}
    <div class="Timeline" id="{$PARAMS.Id}"></div>
    <script type="text/javascript">
        Start
            (
                function ()
                {
                    $("{$PARAMS.Id}").TimelineObject = new Wafl.Controls.Timeline.Timeline($("{$PARAMS.Id}"));
                    $("{$PARAMS.Id}").TimelineObject.Set_ActualProgress({$PARAMS.ActualProgress});
        {if isset($PARAMS.EventClickCallback)}
                    $("{$PARAMS.Id}").TimelineObject.Set_EventClickCallback({$PARAMS.EventClickCallback});
        {/if}
        {if isset($PARAMS.Events)}
                    $("{$PARAMS.Id}").TimelineObject.Set_Events({$PARAMS.Events});
        {/if}
                }
            );
    </script>
{/nocache}