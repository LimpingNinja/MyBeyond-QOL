var knownSheets = undefined;

knownSheets = {
    BetterNPCActor5eSheet: ".item .rollable",
    ActorSheet5eCharacter: ".item .item-image",
    DynamicActorSheet5e: ".item .item-image",
    ActorSheet5eNPC: ".item .item-image",
    DNDBeyondCharacterSheet5e: ".item .item-name .item-image"
  
  //  Sky5eSheet: ".item .item-image",
};
  
let itemDeleteHandler = ev => {
    let actor = game.actors.get(ev.data.data.actor._id);
    let d = new Dialog({
        // localize this text
        title: 'Really delete this item',
        content: '<p>Are you Sure?</p>',
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
    // remove current handler - this is a bit clunky since it results in a case with no delete handler
});

let enableSheetQOL = (app, html, data) => {
    $(html).find(".item-delete").off("click");
    $(html).find(".item-delete").click({ app: app, data: data }, itemDeleteHandler);
}

for (let sheetName of Object.keys(knownSheets)) {
    Hooks.on("render" + sheetName, enableSheetQOL);
}
