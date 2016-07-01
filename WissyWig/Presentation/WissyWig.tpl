<div id="{$TOOLBAR_ID}" style="display: none;" class="WissyWigToolbar">
    <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">H1</a>
    <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2">H2</a>
    <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3">H3</a>
    <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h4">H4</a>
    <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="blockquote">Block</a>
    <a data-wysihtml5-command="normal">P</a>
    <a data-wysihtml5-command="bold"><i class="IconBold"></i></a>
    <a data-wysihtml5-command="italic"><i class="IconItalic"></i></a>
    <a data-wysihtml5-command="justifyLeft"><i class="IconAlignLeft"></i></a>
    <a data-wysihtml5-command="justifyCenter"><i class="IconAlignCenter"></i></a>
    <a data-wysihtml5-command="justifyRight"><i class="IconAlignRight"></i></a>

  <!-- Some wysihtml5 commands require extra parameters -->
  {foreach $TEXT_COLORS as $TEXT_COLOR}
      <a class="wysiwyg-command-{$TEXT_COLOR}" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="{$TEXT_COLOR}">
          &nbsp;
      </a>
  {/foreach}

  <!-- Some wysihtml5 commands like 'createLink' require extra paramaters specified by the user (eg. href) -->
  <a data-wysihtml5-command="createLink">Link</a>
  <div data-wysihtml5-dialog="createLink" style="display: none;">
    <label>
      Link:
      <input data-wysihtml5-dialog-field="href" value="http://" class="text">
    </label>
    <a data-wysihtml5-dialog-action="save">OK</a> <a data-wysihtml5-dialog-action="cancel">Cancel</a>
  </div>
</div>
<textarea style="height: {$TEXTAREA_HEIGHT}; width: 100%;" id="{$TEXTAREA_ID}" name="{$TEXTAREA_ID}" placeholder="Enter your text ..." autofocus>{$START_HTML}</textarea>

 <script type="text/javascript">
    Start
        (
            function ()
            {
                $("{$TEXTAREA_ID}").EditorObject =
                    new Wafl.Controls.WissyWig.WissyWig('{$TEXTAREA_ID}', '{$TOOLBAR_ID}', '{$CSS_FILE}', '{$TEXT_COLORS_STRING}');
            }
        );
</script>