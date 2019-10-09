$(function () {
    var $issueTracker = $("#issue_tracker_id");
    var $attributes = $("#attributes")
    togglePr();
    $issueTracker.on("change", function () {
        togglePr()
    })

    function togglePr() {
        if ($issueTracker.find("option:selected").text() === "PR") {
            $("#issue_description_and_toolbar").closest("p").hide()
            parentPrListen(true)
        } else {
            $("#issue_description_and_toolbar").closest("p").show()
            parentPrListen(false)
        }
        if ($issueTracker.find("option:selected").text() === "CR") {
            doorsBaselineModified(true)
        } else {
            doorsBaseLineChange(false)
        }
    }
    
    function findCustomFieldWrapper(name) {
        return $attributes.find("span:contains('" + name + "')").closest("p")
    }

    function parentPrListen(bind) {
        var $parentPr = $attributes.find("span:contains('Parent PR')").closest("p").find("select")
        if (bind) {
            $parentPr.bind("change", parentPrChange)
        } else {
            $parentPr.unbind("change", parentPrChange)
        }
        if (bind) {
            parentPrChange()
        }
    }

    function parentPrChange() {
        var $attrControlLibrary = findCustomFieldWrapper("Control library")
        if ($(this).find("option:selected").text() === "No") {
            $attrControlLibrary.show()
            $attrControlLibrary.find("input").val("")
        } else {
            $attrControlLibrary.hide()
            $attrControlLibrary.find("input").val(" ")
        }
    }
    
    function doorsBaselineModified(bind) {
        var $parentPr = $attributes.find("span:contains('Doors baseline modified')").closest("p").find("select")
        if (bind) {
            $parentPr.bind("change", doorsBaseLineChange)
        } else {
            $parentPr.unbind("change", doorsBaseLineChange)
        }
        if (bind) {
            doorsBaseLineChange()
        }
    }

    function doorsBaseLineChange() {
        var $1 = findCustomFieldWrapper("doors module")
        var $2 = findCustomFieldWrapper("baseline version")
        var $3 = findCustomFieldWrapper("upper baseline")

        if ($(this).find("option:selected").text() === "no") {
            $1.hide()
            $1.find("input").val("")
            $2.hide()
            $2.find("input").val("")
            $3.hide()
            $3.find("input").val("")
        } else {
            $1.show()
            $1.find("input").val("")
            $2.show()
            $2.find("input").val("")
            $3.show()
            $3.find("input").val("")
        }
    }
})