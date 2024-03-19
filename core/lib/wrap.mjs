import { mdIndent, txtIndent } from "../lib/indent.mjs"

/*
 * Only break on a word boundary.
 */
function sliceText(title, start) {
    if (title.length < start) return 0
    const punctuation = [" ", ".", ",", ":", ";", "!"]
    const ttl = title.slice(0, start)
    for (let i = ttl.length - 1; i >= 0; i--) {
        if (punctuation.includes(ttl[i])) return i
    }
    return 0
}

/*
 * Wrap to constrain width.
 */
export function wrap(config, text, start) {
    let slices = []
    let ok = true
    while (ok) {
        let index = sliceText(text, start)
        if (index !== 0) {
            slices.push(text.slice(0, index))
            text = text.slice(index)
            start = config.maxLength - 2
        }
        if (index === 0) {
            ok = false
            slices.push(text.trim())
            slices = slices.map((slc, indx) => {
                if (indx === 0) return slc.trim()
                // if (indx !== 0) return config.fileType === "md" ? "<br>" + "&nbsp; &nbsp;" + slc.trim() : "\n  " + slc.trim()
                if (indx !== 0) return config.fileType === "md" ? "<br>" + mdIndent + slc.trim() : "\n" + txtIndent + slc.trim()
            })
            return slices.join("")
        }
    }
}
