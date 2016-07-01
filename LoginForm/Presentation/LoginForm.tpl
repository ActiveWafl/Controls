<form action="" method="post" class="LoginForm" style="{if isset($WIDTH)}width: {$WIDTH};{/if}{if isset($WIDTH)}height: {$HEIGHT};{/if}{if isset($PARAMS.style)}{$PARAMS.style}{/if}">
    <div>
        {if isset($PARAMS.useemail) && $PARAMS.useemail == 1}
            <label for="LoginFormUsername">Username</label>
            <input type="text" id="LoginFormUsername" name="Username" />
        {else}
            <label for="LoginFormEmail">Email</label>
            <input type="text" id="LoginFormEmail" name="Email" />
        {/if}
    </div>
    <div>
        <label for="LoginFormPassword">Password</label>
        <input type="password" id="LoginFormPassword" name="Password" />
    </div>
</form>