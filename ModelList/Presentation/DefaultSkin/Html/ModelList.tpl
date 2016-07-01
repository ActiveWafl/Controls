<div id="{$PARAMS.Id}">
    <h4 class="Title">{$QUALIFIED_MODEL_TYPE} List</h4>
    <table modeltype="{$MODEL_TYPE}" class="NoMargin {if isset($PARAMS["Class"])}{$PARAMS.Class}{else}Bordered NoHover{/if}">
        <tr>
            {foreach $PROPERTIES as $PROPERTY}
                <th>{$PROPERTY}</th>
                {/foreach}
            <th>
            </th>
        </tr>
        {foreach $MODELS as $MODEL}
            <tr id="{$PARAMS.Id}_{$MODEL_TYPE}_{$MODEL->Get_KeyFieldValue()}" class="{$MODEL_TYPE}_{$MODEL->Get_KeyFieldValue()}">
                {foreach $PROPERTIES as $PROPERTY}
                    {capture assign="METHOD_NAME"}Get_{$PROPERTY}{/capture}
                    <td>{$MODEL->$METHOD_NAME()}</td>
                {/foreach}
                {capture assign="UI_ID"}ModelEditor_{$PARAMS.Id}_{$MODEL_TYPE}_{$MODEL->Get_KeyFieldValue()}{/capture}
                <td>
                    <button id="Edit_{$PARAMS.Id}_{$MODEL_TYPE}_{$MODEL->Get_KeyFieldValue()}" class="EditModel" modelType="{$MODEL_TYPE}" uiid="{$UI_ID}">Edit</button>&nbsp;
                    <button class="DeleteModel" modeltype="{$MODEL_TYPE}" modelid="{$MODEL->Get_KeyFieldValue()}" >Delete</button>
                    <div class="ModelEditorDialog" hidden>
                        {model_editor Id=$UI_ID Model=$MODEL}
                    </div>
                </td>
            </tr>
        {/foreach}
    </table>
    <div class="Toolbar">
        <ul>
            {capture assign="UI_ID"}ModelEditor_{$PARAMS.Id}_{$MODEL_TYPE}_New{/capture}
            <li><button class="EditModel" modelType="{$MODEL_TYPE}" uiid="{$UI_ID}">New {$MODEL_TYPE}</button></li>
            <div class="ModelEditorDialog" hidden>
                {model_editor Id=$UI_ID ModelType=$QUALIFIED_MODEL_TYPE}
            </div>
        </ul>
    </div>
    <script type="text/javascript">
        Start
            (
                function () {
                    $("{$PARAMS.Id}").ModelListObject = new Wafl.Controls.ModelList.ModelList();
                }
            );
    </script>
</div>