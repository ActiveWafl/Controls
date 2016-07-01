<img name="{$ELEMENT_NAME}" id="{$ELEMENT_ID}" src="{$LOADING_ANI_URI}" alt="Human Verification Image" />
<script type="text/javascript">
    Start
        (
            function ()
            {
                $("{$ELEMENT_ID}").CaptchaObject =
                    new Wafl.Controls.Captcha.Captcha($("{$ELEMENT_ID}"), '{$RESET_ACTION}', '{$LOADING_ANI_URI}');
            }
        );
</script>