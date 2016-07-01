<?php

namespace Wafl\Controls\MaskedInput;

//phone (###)-###-####
//date ##/##/####
//date a* ##, ####
//
//* an amount of preceding char
//. any chars
//? any single char
//a any single alpha char
//# any single numeric
//% any single alphanumeric
//[1-9] any number within range
//[a-z] any char within range

class MaskedInput
extends \DblEj\Extension\ControlBase
{

    public static function Get_Dependencies()
    {
        return null;
    }

    public static function Get_MainTemplate()
    {
        return "MaskedInput/Presentation/DefaultSkin/Html/MaskedInput.tpl";
    }
}