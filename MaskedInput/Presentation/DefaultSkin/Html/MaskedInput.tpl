{nocache}
    {if isset($PARAMS.Prepend) && isset($PARAMS.Append)}
        <div class="Append Prepend">
        {elseif isset($PARAMS.Prepend)}
            <div class="Prepend">
            {elseif isset($PARAMS.Append)}
                <div class="Append">
                {/if}

                <input type="hidden" {if isset($PARAMS.Id)}id="{$PARAMS.Id}" {/if}{if isset($PARAMS.PostName)}name="{$PARAMS.PostName}" {/if}{if isset($PARAMS.Value)}value="{$PARAMS.Value}"{/if} />


                {if isset($PARAMS.Prepend)||isset($PARAMS.Append)}
                </div>
            {/if}

            <script type="text/javascript">
                Start
                    (
                        function ()
                        {
                            $("{$PARAMS.Id}").InputObject =
                                new Wafl.Controls.MaskedInput.MaskedInput($("{$PARAMS.Id}"), "{$PARAMS.Format}");
                {if isset($PARAMS.ChangeCallback)}
                            $("{$PARAMS.Id}").InputObject.Set_ChangeCallback({$PARAMS.ChangeCallback});
                {/if}
                {if isset($PARAMS.ChangeCallbackParam)}
                            $("{$PARAMS.Id}").InputObject.Set_ChangeCallbackParam({$PARAMS.ChangeCallbackParam});
                {/if}
                        }
                    );
            </script>
        {/nocache}