<form method="post" {if isset($PARAMS.Id)}id="{$PARAMS.Id}"{/if} {if isset($PARAMS.Class)}class="{$PARAMS.Class}"{/if} {if isset($PARAMS.FormAction)}action="{$PARAMS.FormAction}"{/if}>
    <div class="Auto Grid Layout">
        <div class="Row">
            {foreach $PROPERTIES as $PROPERTY}
                <div class="Spans6">{property_input model=$EDIT_MODEL property=$PROPERTY label=true}</div>
            {/foreach}
        </div>
    </div>

    <button onclick="this.FindClosest('[name=Action]').value = '{if isset($PARAMS.SaveAction)}{$PARAMS.SaveAction}{else}SaveModel{/if}';">Save</button>
    <button onclick="this.FindClosest('[name=Action]').value = '{if isset($PARAMS.DeleteAction)}{$PARAMS.DeleteAction}{else}DeleteModel{/if}';">Delete</button>
    <input type="hidden" name="Action" value="{if isset($PARAMS.SaveAction)}{$PARAMS.SaveAction}{else}SaveModel{/if}" />
    <script type="text/javascript">
        Start
            (
                function () {
                    $("{$PARAMS.Id}").ModelEditorObject =
                        new Wafl.Controls.ModelEditor.ModelEditor("{$PARAMS.Id}", "{$MODEL_TYPE}", "{$EDIT_MODEL->Get_KeyFieldValue()}");
                }
            );
    </script>
</form>