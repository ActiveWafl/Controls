{nocache}
    <input id="{$PARAMS.Id}" type="text" list="{$PARAMS.Id}-DataList" class="AutoComplete" data-source-api="{$PARAMS.DataSourceApi}" data-source-api-argname="{$PARAMS.DataSourceApiArg}" />
    <datalist id="{$PARAMS.Id}-DataList">
    </datalist>
    <script type="text/javascript">
        $("{$PARAMS.Id}").InputObject = new Wafl.Controls.AutoComplete.AutoComplete($("{$PARAMS.Id}"));
    </script>
{/nocache}