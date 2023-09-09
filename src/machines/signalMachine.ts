import { start } from "repl";
import { actions, assign, createMachine } from "xstate";

export const signalMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QGUCWUB2BDANgAgFksBjAC1QzADoAlSAGSwCcYBiSgDwBdkusuwAbQAMAXUSgADgHtYqLqmkYJIDogC0ARgAcAdgAsVAJwBmAEzbtANl26dZowBoQAT0T792qrqs6jVs019ByMAX1DnNExcQhJySloGZjZJLABXWCExFRk5BSUVNQR1M2FhIyp9IzL9Aw9tTSt9ZzcEKz0qYQDNM31GgFY9KvDI9Gx8IjIKajoIRhYwVkkmMAA3Xn4s8SQQXPlFZR2i2s1vXX6TTX7bE11yp1cNYNOjfqDhC+FrBs0RkCjxrEpglZvM2CtYGkALZbHKyfYFI4aIImQwmbS3Rr6MpmKzXFqIHq9Kg9ALXEz9YTnYT6P4AmKTeIzJILVgcWB8ARULAAMwETAAFJoysIAJSsekTOLTRJzZKwnZ7fKHUBFLSWfrePSokxWXwmcxmAkIapeA1GXQWoxmfp4-RWOljBnSkEstjsznUXn8oUi8WSoFM2VgoSabZSeHKwrI0yGG24ynx7TBbTGzTCuOXK7CqnVDyO6JS4HMuWsj2bbl8sCCnNiiVOotB0HywRmcO7SMHaPFFFojF2Jo4vG6NMGsxUa4BXzWjF6AuAxky2bIKG4HDsMDcDYCETtpVdpHFC1WKjaGn6fr9Xp9Typx4IHrnSpUw3aSmX23z53F2UrtdLFZ1k9Xc4TyA9VWRfoL2MOwdF0M8uk0eC0y+XRvFxG1Bl6PQri-Rsl0gP8cHXVIMgVCMwMRCDikCAJT2FN8zF0XFhDMI17yuWwJ0vIJ+iMHQKW0Mw8MDAiICI9cIWhciO0olVVGRKlTngqwqSqN8fGaDjKUMBiHDqS8bV0ETF1dcTV2ItkOQrb1q19Mp-QbUSzIkkDFU7KiFJ7XiSSpGxUQuUogjTDxNWxIT-HaG1rBMEyXRLCSrM9SsfVrRzC2chKLJwQQw1AhF5LVK9hCoCkLFxVEHAsLTWkaNiqDY1i+jYhpSlpCJ-ic0ysv-csuVsms-XrDLut-bLWz3DzCsUuwtVUgwjA0po018cdLwxVjWMuMk4p-ABxFYwAwDct2A7J3Lk7soMMcor2sWpfE0tMek1JDLUGTR0WnfpdqDA6wCOgC1m3GT908tV0zfLVTF1XobCaGrEEWkxKkacx+3qD5fplf7AdIzI3IogruwMcdmMGHxzmTDwHlaXRzG8QZk2sD4DTnDqA1G3HjqkmFCdk4mdlq4RPpJPUTGEcx6bfKDnCKU1fOqSW9RpbQjDCDmuviqhuaSmyq0FSkHOGhdte5-mwem4oJYawJLw+Wj-E+0cuKaBxk3OPw+mxhJdb6r0DYFI2605s3DowXLJsuw8FeFJXdVUzx1eNfxXvFyWmPRS92tGEbtYATTAYjpAAdxOngzqjwXqLMS5T3KlF1v0cxEetoJOgNW5SfOD8feoQvi7L5Zgcr-Ko0PEpoOtZiGmqWuMWtEK1ZJZMAn4141e0PuqAHnBS6WdICfOonx+o1SUaEz4rj0SwTGNdQmk1PR4OtL4r38WLNbzn9d-33nQamt2NWhgNKWHtOUEwRgqgpyQmLKwEspZZygtvX+Zd-YpTsqUY2ocf5Fz3iXC2gCJ7ogqFYRa6tBx2klvfPimpLhOyuJnUwwkv6m1wYPPW-VA5YJDlrdh+DI5j3Al5YBp5rhgNUqYKBtNEDWAqI0eBGdpbZ23gABUPoRT0rB-6EOjtRLQupNTwQvJ7baZD+j3yuCeHSm9EKSw+A6Vh34gzqLIuJLROi8oXWrl5Axkt6K3nIY3O8rR1AMyxJ9CW6lyo506t-FxGj3GbG0XAaSE0hHg0UurCc-EaRUgxLqVuEsvC1GiqpVi5JHG5zYQktxIMUmQj5iYKup9fFCXHNadMCZaiXGNH0CopRikXAYowtRiT6mcArpsXRPiIZVGUhLVipRrjdONFnMW1gmiLV8BiGwYy6laMmSDQR3jWlqjVmhaw6ZQrvnVnfe8Z4UZ3E0B-ZieIPga2qc4mUrjMhJIEOXY5bYMlWy0C8rwL9qrnFKR8Y01IGqWkYt0QIzF9l-ImZuKZO5mkgu7FocBp49Q2CuH0PQUDjTXBAXxUwn08x8SqXEmpPzxlaOHkBaZx8BZnMggYBqqsUU6Huq3G0JUqgXhIV8JqNo0WaOSWy45XiT7CIhraEquJm6lAaBUmkaZSidFeNaSk6N4afy+fhBIvzZUAvlcBYFpzlXIjfCeNiLyoJdANM3VuOgzizmCFBSBHx6Yyv+YsG10ycX2syT2ZMT8HC2jkaYApljGinktCEBoH003hA6hgaQEA4AqBwUyXFE8XUlS1YxN5Sz77WhRlULozEAp2HZmazKwZ5Qlv0QMF4Bo7BQOKrXCx95nn1yvNieBqkrwMqLWJCSnbfE9EsIS4U714HYi6KOK4VBxaWh8PxT206+F-XDvOoodw1rlDKG8GK7QQmEhFijBRCDM4y1iTOhIqDT2IHaAM8RVyyrSxofTU8UDVLtB8LXJCwaQZfp7OrLwSyLC2ntMSkc951C7JJNUGwt56HN2zaEIAA */
    "id": "Signal Machine",
    "initial": "RedLarge",
    context: {
        countDownValue: 8 as number,
        IsPaused: false,
        activeState: "RedLarge" as string
    },
    schema: {
        events: {} as { type: "nextState" } | { type: "prevState" } | { type: "pause" } | { type: "play" } | { type: "resume" }
    },
    states: {
        "RedLarge": {
            after: {
                "1000": [{
                    cond: "IsItPaused"
                },
                {
                    target: "RedLarge",
                    actions: ["decrementValueInContext", "assignRedLargeToContext"],
                    cond: "checkTimeInRedLarge"
                }, {
                    target: "RedSmall",
                    actions: ["assignTime3ToContext", "assignRedSmallToContext"]
                }]
            },
            on: {
                nextState: {
                    target: "RedSmall",
                    actions: ["assignTime3ToContext", "assignRedSmallToContext"]
                },
                pause: {
                    target: "PausedState",
                    actions: ["assignTime8ToContext", "assignTrueToContext"]
                },
                prevState: {
                    target: "Yellow",
                    actions: ["assignTime8ToContext", "assignYellowToContext"]
                },
                resume: {
                    target: "RedLarge",
                    actions: "assignFalseToContext"
                }
            }

        },
        "RedSmall": {
            on: {
                nextState: {
                    target: "Green",
                    actions: ["assignGreenToContext"]
                },
                prevState: {
                    target: "RedLarge",
                    actions: ["assignTime8ToContext", "assignRedLargeToContext"]
                },
                pause: {
                    target: "PausedState",
                    actions: ["assignTime3ToContext", "assignTrueToContext"]
                },
                resume: {
                    target: "RedSmall",
                    actions: "assignFalseToContext"
                }
            },
            after: {
                "1000": [
                    {
                        cond: 'IsItPaused'
                    },
                    {
                        target: "RedSmall",
                        actions: ["decrementValueInContext", "assignRedSmallToContext"],
                        cond: "checkTimeInRedSmall"
                    }, {
                        target: "Green",
                        actions: ["assignGreenToContext"],
                        // internal: false
                    }]
            },
        },
        "Green": {
            after: {
                "5000": [{
                    cond: "IsItPaused"
                },
                {
                    target: "Yellow",
                    actions: ["assignTime8ToContext", "assignYellowToContext"]
                }]
            },
            on: {
                nextState: {
                    target: "Yellow",
                    actions: ["assignTime8ToContext", "assignYellowToContext"]
                },
                prevState: {
                    target: "RedSmall",
                    actions: ["assignTime3ToContext", "assignRedSmallToContext"]
                },
                pause: {
                    target: "PausedState",
                    actions:"assignTrueToContext"
                },
                resume: {
                    target: "Green",
                    actions: "assignFalseToContext"
                }
            },
        },
        "Yellow": {
            on: {
                nextState: {
                    target: "RedLarge",
                    actions: ["assignTime8ToContext", "assignRedLargeToContext"]
                },
                prevState: {
                    target: "Green",
                    actions: ["assignTime8ToContext", "assignGreenToContext"]
                },
                pause: {
                    target: "PausedState",
                    actions:"assignTrueToContext"
                },
                resume: {
                    target: "Yellow",
                    actions: "assignFalseToContext"
                }
            },
            after: {
                "2000": [{
                    cond: "IsItPaused"
                },
                {
                    target: "RedLarge",
                    actions: ["assignRedLargeToContext"]
                }]
            }
        },
        "PausedState": {
            on: {
                resume: [{
                    target: "RedLarge",
                    actions: "assignFalseToContext",
                    cond: "checkRedLarge"
                }, {
                    target: "RedSmall",
                    actions: "assignFalseToContext",
                    cond: "checkRedSmall"
                }, {
                    target: "Green",
                    actions: "assignFalseToContext",
                    cond: "checkGreen"
                }, {
                    target: "Yellow",
                    actions: "assignFalseToContext",
                    cond: "checkYellow"
                }],
                nextState: [{
                    target: "RedSmall",
                    actions: ["assignTime3ToContext","assignRedSmallToContext"],
                    cond: "checkRedLarge"
                }, {
                    target: "Green",
                    actions: ["assignTime3ToContext","assignGreenToContext"],
                    cond: "checkRedSmall"
                }, {
                    target: "Yellow",
                    actions:"assignYellowToContext",
                    cond: "checkGreen"
                }, {
                    target: "RedLarge",
                    actions:["assignTime8ToContext","assignRedLargeToContext"],
                    cond: "checkYellow"
                }],
                prevState:[{
                    target:"Yellow",
                    actions:["assignTime8ToContext","assignYellowToContext"],
                    cond:"checkRedLarge"
                },{
                    target:"RedLarge",
                    actions:["assignTime8ToContext","assignRedLargeToContext"],
                    cond:"checkRedSmall"
                },{
                    target:"RedSmall",
                    actions:["assignTime3ToContext","assignRedSmallToContext"],
                    cond:"checkGreen"
                },{
                    target:"Green",
                    actions:"assignGreenToContext",
                    cond:"checkYellow"
                }],
            }
        }
    }
}, {
    guards: {
        checkTimeInRedLarge: (context) => context.countDownValue > 4,
        checkTimeInRedSmall: (context) => context.countDownValue > 1,
        checkRedLarge: (context) => context.activeState === "RedLarge",
        checkRedSmall: (context) => context.activeState === "RedSmall",
        checkGreen: (context) => context.activeState === "Green",
        checkYellow: (context) => context.activeState === "Yellow",
        IsItPaused: (context) => context.IsPaused
    },
    actions: {
        decrementValueInContext: assign((context, event) => {
            return {
                countDownValue: context.countDownValue - 1
            }
        }),
        assignTime8ToContext: assign((context, event) => {
            return {
                countDownValue: 8
            }
        }),
        assignTime3ToContext: assign((context, event) => {
            return {
                countDownValue: 3
            }
        }),
        assignRedLargeToContext: assign((context, event) => {
            return {
                activeState: "RedLarge"
            }
        }),
        assignRedSmallToContext: assign((context, event) => {
            return {
                activeState: "RedSmall"
            }
        }),
        assignGreenToContext: assign((context, event) => {
            return {
                activeState: "Green"
            }
        }),
        assignYellowToContext: assign((context, event) => {
            return {
                activeState: "Yellow"
            }
        }),
        assignTrueToContext: assign((context, event) => {
            return {
                IsPaused: true
            }
        }),
        assignFalseToContext: assign((context, event) => {
            return {
                IsPaused: false
            }
        }),
    }
})