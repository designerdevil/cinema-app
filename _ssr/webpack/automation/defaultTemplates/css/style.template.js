import fs from 'fs-extra';
import path from 'path'

function generateStyleFile(COMPONENT_NAME) {
    return `.${COMPONENT_NAME.toLowerCase()}{}`
}

function appendAppStyle(targetFile, newFile) {
    const relativePath = path.relative(targetFile, newFile).split(path.sep).splice(1).join('/');
    const newContent = `@import '${relativePath}';`;
    fs.readFile(`${targetFile}`, 'utf8', (err, content) => {
        if (err) {
            console.log(err); // Stacktrace
        }

        fs.outputFile(`${targetFile}`,
            `${content}\n${newContent}`, err => {
                if (err) {
                    console.log(err); // Stacktrace
                }
            }
        )
    })
}
export {
    generateStyleFile,
    appendAppStyle
}
