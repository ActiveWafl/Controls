/*
 *@namespace Wafl.Controls.WissyWig
 */
Namespace("Wafl.Controls.WissyWig");

/*
 *@class WissyWig
 *@extends Class
 */
Wafl.Controls.WissyWig.WissyWig = Class.extend(
    {
        imageElement: null,
        resetAction: null,
        loadHandler: null,
        init: function (textAreaElemId, toolbarElemId, cssFile, colorsString)
        {
            if (IsDefined(cssFile) && cssFile != "" && cssFile != null)
            {
                var colorArray = colorsString.split(",");
                for (var colrIdx=0; colrIdx < colorArray.length; colrIdx++)
                {
                    var color = colorArray[colrIdx];
                    wysihtml5ParserRules.classes["wysiwyg-color-"+color] = 1;
                }
                var editor = new wysihtml5.Editor(textAreaElemId, {
                  toolbar:      toolbarElemId,
                  parserRules:  wysihtml5ParserRules,
                  stylesheets: ["/ControlResource/WissyWig/WissyWigEditor.css", cssFile]
                });
            } else {
                var editor = new wysihtml5.Editor(textAreaElemId, {
                  toolbar:      toolbarElemId,
                  parserRules:  wysihtml5ParserRules,
                  stylesheets: ["/ControlResource/WissyWig/WissyWigEditor.css"]
                });
            }
        }
    });