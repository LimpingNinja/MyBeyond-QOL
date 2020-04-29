let itemDeleteHandler = ev => {
    let actor = game.actors.get(ev.data.data.actor._id);
    let d = new Dialog({
        // localize this text
        title: i18n("minor-qol.reallyDelete"),
        content: `<p>${i18n("minor-qol.sure")}</p>`,
        buttons: {
            one: {
                icon: '<i class="fas fa-check"></i>',
                label: "Delete",
                callback: () => {
                    let li = $(ev.currentTarget).parents(".item"), itemId = li.attr("data-item-id");
                    ev.data.app.object.deleteOwnedItem(itemId);
                    li.slideUp(200, () => ev.data.app.render(false));
                }
            },
            two: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",
                callback: () => { }
            }
        },
        default: "two"
    });
    d.render(true);
};

Hooks.on('init', () => {
    console.log("MyBeyond Theme - Init")
    $("head").append(`<link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Noto+Sans:400,700|Open+Sans:400,700|Roboto+Condensed:400,700|Roboto:400,500,700&display=swap" rel="stylesheet">`);

    const defaultTag = ".item .item-image";
    //Add a check for item deletion
    if (itemDeleteCheck) {
        // remove current handler - this is a bit clunky since it results in a case with no delete handler
        $(html).find(".item-delete").off("click");
        $(html).find(".item-delete").click({ app: app, data: data }, itemDeleteHandler);
    }
})
