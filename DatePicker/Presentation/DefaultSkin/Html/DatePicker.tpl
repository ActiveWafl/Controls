{nocache}
<div style="display: inline-block; *display: inline; {if isset($WIDTH)}width: {$WIDTH}px;{/if}position: relative;" class="DatePicker">
    <input class="DatePicker {if isset($PARAMS.Class)}{$PARAMS.Class}{/if}" type="text"
           {if isset($PARAMS.Id)}id="{$PARAMS.Id}"{/if}
           {if isset($PARAMS.PostName)}name="{$PARAMS.PostName}"{/if}
           {if isset($PARAMS.Value)}value="{$PARAMS.Value}"{else}value="0"{/if}
           {if isset($PARAMS.Disabled)}disabled="{$PARAMS.Disabled}"{/if}
           {if isset($PARAMS.Required)}required="{$PARAMS.Required}"{/if}
           style="{if isset($PARAMS.Style)}{$PARAMS.Style} {/if}{if isset($WIDTH)}width: {$WIDTH}px;{else}width: 100%;{/if}" {if isset($PARAMS.Attributes)}{$PARAMS.Attributes}{/if} />
    <div class="Calendar" {if isset($PARAMS.Id)}id="{$PARAMS.Id}-Calendar"{/if} >
        <div style="z-index: 1; display: block;">
            <header>
                <a title="Prev" {if isset($PARAMS.Id)}id="{$PARAMS.Id}-PrevLink"{/if} class="Previous" href="" onclick="return false;">
                    <i class="IconCircleLeft"></i>
                </a>
                <a title="Next" {if isset($PARAMS.Id)}id="{$PARAMS.Id}-NextLink"{/if} class="Next" href="" onclick="return false;">
                    <i class="IconCircleRight"></i>
                </a>
                <div class="Title" {if isset($PARAMS.Id)}id="{$PARAMS.Id}-Title"{/if}>
                    January 1900
                </div>
            </header>
            <table {if isset($PARAMS.Id)}id="{$PARAMS.Id}-CalendarTable"{/if} >
                <thead>
                    <tr><th class="Weekend"><span title="Sunday">Su</span></th>
                        <th><span title="Monday">Mo</span></th>
                        <th><span title="Tuesday">Tu</span></th>
                        <th><span title="Wednesday">We</span></th>
                        <th><span title="Thursday">Th</span></th>
                        <th><span title="Friday">Fr</span></th>
                        <th class="Weekend"><span title="Saturday">Sa</span></th>
                    </tr>
                </thead>
                <tbody {if isset($PARAMS.Id)}id="{$PARAMS.Id}-CalendarTableBody"{/if} >
                </tbody>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    Start
        (
            function ()
            {
                $("{$PARAMS.Id}").DatePickerObject =
                    new Wafl.Controls.DatePicker.DatePicker($("{$PARAMS.Id}"), $("{$PARAMS.Id}-Calendar"), $("{$PARAMS.Id}-CalendarTable"), $("{$PARAMS.Id}-Title"));
    {if isset($PARAMS.Month)}
                $("{$PARAMS.Id}").DatePickerObject.Set_Month({$PARAMS.Month});
    {/if}
    {if isset($PARAMS.Year)}
                $("{$PARAMS.Id}").DatePickerObject.Set_Year({$PARAMS.Year});
    {/if}
    {if isset($PARAMS.Day)}
                $("{$PARAMS.Id}").DatePickerObject.Set_Day({$PARAMS.Day});
    {/if}
    {if isset($PARAMS.Value)}
                $("{$PARAMS.Id}").DatePickerObject.SetDateFromTimestamp({$PARAMS.Value});
    {/if}

                $("{$PARAMS.Id}-NextLink")
                    .AddClickHandler(
                        function ()
                        {
                            $("{$PARAMS.Id}").DatePickerObject.GotoNextMonth();
                        }
                    );
                $("{$PARAMS.Id}-PrevLink")
                    .AddClickHandler(
                        function ()
                        {
                            $("{$PARAMS.Id}").DatePickerObject.GotoPreviousMonth();
                        }
                    );
            }
        );
</script>
{/nocache}