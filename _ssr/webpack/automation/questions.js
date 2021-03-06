const questions = {
    type: {
        type: 'list',
        name: 'type',
        message: 'What kind of components do you want to create ?',
        choices: ['stateless', 'class', 'pure'],
    },
    name: {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component ?',
        default: 'ComponentName',
        validate: (input) => {
            if (input.indexOf(' ') > -1) {
                console.error(': Name must not contain space');
            } else {
                return true;
            }
        }
    },
    connected: {
        type: 'confirm',
        name: 'connected',
        message: 'Do you want to connect the component to redux ?',
        default: false,
    },
    indexFile: {
        type: 'confirm',
        name: 'indexFile',
        message: 'Do you want an index file on your folder ?',
        default: false,
    },
    jsExtension: {
        type: 'list',
        name: 'jsExtension',
        message: 'What kind of extension do you use for js files ?',
        choices: ['js', 'jsx'],
    },
    cssExtension: {
        type: 'list',
        name: 'cssExtension',
        message: 'What kind of extension do you use for style file ?',
        choices: ['scss', 'css', 'scss', 'sass', 'less', "I don't want a style file"],
        filter: (input) => {
            if (input === "I don't want a style file") {
                return false
            }
            return input
        },
    },
    /*includeStories: {
      type: 'confirm',
      name: 'includeStories',
      message: 'Do you want a storybook file?',
      default: true,
    },*/
    includeTests: {
        type: 'confirm',
        name: 'includeTests',
        message: 'Do you want a test file?',
        default: false,
    },
    path: {
        type: 'input',
        name: 'path',
        message: 'Where do you want create your component ?',
        default: './app/components',
    },
}

const templateQuestions = {
    template: templates => ({
        type: 'list',
        name: 'template',
        message: 'Choose a template',
        choices: templates,
    }),
}

export {
    questions,
    templateQuestions
}
