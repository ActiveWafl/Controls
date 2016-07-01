{if isset($PARAMS.flow) && $PARAMS.flow == "horizontal"}
    <form action="" method="post" class="MicroLoginForm Horizontal" style="{if isset($WIDTH)}width: {$WIDTH};{/if}{if isset($HEIGHT)}height: {$HEIGHT};{/if}{if isset($PARAMS.style)}{$PARAMS.style}{/if}">
        <div class="Left">
            {if isset($PARAMS.useemail) && $PARAMS.useemail == "true"}
                <label for="LoginFormEmail">Email</label>
                <input type="text" id="LoginFormEmail" name="Email" />
            {else}
                <label for="LoginFormUsername">Username</label>
                <input type="text" id="LoginFormUsername" name="Username" />
            {/if}
        </div>
        <div class="Left" style="margin-left: 10px;">
            <label for="LoginFormPassword">Password</label>
            <input type="password" id="LoginFormPassword" name="Password" />
        </div>
        <button type="submit">Login</button>
        {if isset($PARAMS.includeRegisterLink) && $PARAMS.includeRegisterLink == "true"}
            <a href="{if isset($PARAMS.registerLinkUrl)}{$PARAMS.registerLinkUrl}{/if}" style="{if isset($PARAMS.registerLinkStyle)}{$PARAMS.registerLinkStyle}{/if}">Register</a>
        {/if}
    </form>
{else}
    <form action="" method="post" class="MicroLoginForm Vertical" style="{if isset($WIDTH)}width: {$WIDTH};{/if}{if isset($HEIGHT)}height: {$HEIGHT};{/if}{if isset($PARAMS.style)}{$PARAMS.style}{/if}">
        <div>
            {if isset($PARAMS.useemail) && $PARAMS.useemail == "true"}
                <label for="LoginFormEmail">Email</label>
                <input type="text" id="LoginFormEmail" name="Email" />
            {else}
                <label for="LoginFormUsername">Username</label>
                <input type="text" id="LoginFormUsername" name="Username" />
            {/if}
        </div>
        <div>
            <label for="LoginFormPassword">Password</label>
            <input type="password" id="LoginFormPassword" name="Password" />
        </div>
        <button type="submit">Login</button>
        {if isset($PARAMS.includeRegisterLink) && $PARAMS.includeRegisterLink == "true"}
            <a href="{if isset($PARAMS.registerLinkUrl)}{$PARAMS.registerLinkUrl}{/if}" style="{if isset($PARAMS.registerLinkStyle)}{$PARAMS.registerLinkStyle}{/if}">Register</a>
        {/if}
    </form>
{/if}