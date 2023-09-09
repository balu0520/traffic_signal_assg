import { start } from "repl";
import { actions, assign, createMachine } from "xstate";

export const signalMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QGUCWUB2BDANgAgFksBjAC1QzADoAlSAGSwCcYBiSgDwBdkusuwAbQAMAXUSgADgHtYqLqmkYJIDogC0ARgAcAdgAsVAJwBmAEzbtANl26dZowBoQAT0T792qrqs6jVs019ByMAX1DnNExcQhJySloGZjZJLABXWCExFRk5BSUVNQR1M2FhIyp9IzL9Aw9tTSt9ZzcEKz0qYQDNM31GgFY9KvDI9Gx8IjIKajoIRhYwVkkmMAA3Xn4s8SQQXPlFZR2i2s1vXX6TTX7bE11yp1cNYNOjfqDhC+FrBs0RkCjxrEpglZvM2BxYHwBFQsAAzARMAAUmjKwgAlKwATFJvEZkkFiJtlJZPsCkcNDptP1vHoTPoTFZfCZzGYWohql5mUZdNyjGZ+lZ+vorH8sRM4tNEnNkosIVDqHCEcjURixUDcVKwUJNETdiT8odQEUtKZDPyzILhObtMFtGyEJoUWbLlcUcIecIPKKxtiJSDIMgALa4HDsMDcDYCQk5fUHQoablWKjaT36fr9Xp9Tx2x4OsznSrullUj7pkURf4+8XAvEQIMhpYrdby6M7PYG+PFK5p4x2HS6FNdTQD+0ojq6C38wa9PRXb3Rasa2b1nCh1IZLYxvJx8nFQIBZNjjMTqxW1m5q62Kjpt5pow6EzT+eAnGS5fB1esOWbGHwsBIt10UxKt1TfAMPxwVtiW3MkjQpIJqRRHxdDpC5SiCUcPGpfQvgcRltH5awTGfX0aylFdQ2-aFFX-ZUylVEDX39OsIMEHUt1JQ1VA0DNhCoR8LAtOkHAsZoLwCMwqDMUpeh6Cwek9EjF0lABxFYwAwMMIxbbI21jWDuIQIVDHKDNrFqXwfDE1pHX5Khhx5QZNBMaxNFeJTQISNSwA0xs1kjTc9JgrjjUdKkaVMBlehsJprPZbQTEqRpzASuoU36DymOobzfPXTIoL1YLOwMSSJ0GZDBg8Kp7RQ0rBhtawPmZPRMr9bL1M0qiFT-JF+hVYCF089qfIwAr2x3ODihMPjpKuPqM0afxnNHW5dCoJoHBtc4-D6VqyIATTAVdpAAdy0ngdN1caDKKMxLmTQSgkfSrzDiqagk6ZlVuCc4bz2jVDuOs7ln8y6OI7XcSh7PkJwaao7oSvlMO0CodGFBw3MGIxtH+yVAZwU6lnSfLdOgzjO1PRKCM+K49EsEx7XUJpqT0Ac+S+DN-GIis1Syqh8cJrrfyVUp6IGl82v5o6CZOsb9JCjQXIqKxsaMfwcMFHCGdzdR+lefi3N8K58xMUwzFxhIAAViYDeVWBWWA0kDQKyYhyatAZakBzTbbLkZV5GauJM+s8bGh2EaaBQt6hrY3Os7Ydp3tSu+XOw9hxrxV-xTD67O3rc-jhS6CPnhTFzo6oWPMnjzZ7bgJPBDMFOishlE1eve9PXdBKGTe6avFqQjTyta4GQrqvbdrxPncEExm-JyGB2Dpfh3vQd+ntIUkzu0oBVKXxuV0cIKwwaQIDgFReba8GJsMkpAj4hoOfzC0z0ZvlEpVrpntpbkK9BGUN8boUkFC8ZkdgjBphko+GqwhTjU16N-U8GZyyjEGnzd8IYgEKy7BYLwrl3SvCsHSMoVgVpXHWsQnkPh7zbVQZWdBkscpcWujgu4klc5lDeERdoOYbJwMSo0YhEcTZUiFBXAWJ1sEUxRlJa4lgmTHhcozUeyZIGnnaD4O6w5x42xrgIaRrc1ZeDPBYAUwobDDkZglJMbkugGHpm5ekx9QhAA */
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