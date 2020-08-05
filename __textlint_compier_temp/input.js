// Generated webworker code by textlint-script-compiler
import { TextlintKernel } from "@textlint/kernel";
import { moduleInterop } from "@textlint/module-interop";
import { presetToKernelRules } from "@textlint/runtime-helper"
const kernel = new TextlintKernel();
const presetRules = [
    presetToKernelRules(moduleInterop(require('textlint-rule-preset-japanese')), 'preset-japanese')
].flat();
const rules = [
    {
        "ruleId": "@textlint-ja/no-insert-dropping-sa",
        "rule": moduleInterop(require('@textlint-ja/textlint-rule-no-insert-dropping-sa')),
        "options": true
    },
    {
        "ruleId": "@textlint-rule/no-unmatched-pair",
        "rule": moduleInterop(require('@textlint-rule/textlint-rule-no-unmatched-pair')),
        "options": true
    },
    {
        "ruleId": "date-weekday-mismatch",
        "rule": moduleInterop(require('textlint-rule-date-weekday-mismatch')),
        "options": true
    },
    {
        "ruleId": "no-start-duplicated-conjunction",
        "rule": moduleInterop(require('textlint-rule-no-start-duplicated-conjunction')),
        "options": true
    },
    {
        "ruleId": "ja-no-redundant-expression",
        "rule": moduleInterop(require('textlint-rule-ja-no-redundant-expression')),
        "options": true
    },
    {
        "ruleId": "ja-unnatural-alphabet",
        "rule": moduleInterop(require('textlint-rule-ja-unnatural-alphabet')),
        "options": true
    },
    {
        "ruleId": "@proofdict/proofdict",
        "rule": moduleInterop(require('@proofdict/textlint-rule-proofdict')),
        "options": {
            "dictURL": "https://azu.github.io/proof-dictionary/"
        }
    }
];
const filterRules = [];
const plugins = [
    {
        "pluginId": "@textlint/text",
        "plugin": moduleInterop(require('@textlint/textlint-plugin-text')),
        "options": true
    },
    {
        "pluginId": "@textlint/markdown",
        "plugin": moduleInterop(require('@textlint/textlint-plugin-markdown')),
        "options": true
    }
];
const allRules = rules.concat(presetRules);
const config = {
    rules: allRules,
    filterRules: filterRules,
    plugins: plugins
};
const assignConfig = (overrideConfig) => {
    if (overrideConfig.rules) {
        config.rules = config.rules.map(rule => {
            const override = overrideConfig.rules.find(o => o.ruleId === rule.ruleId);
            return { ...rule, ...override };
        });
    }
    if (overrideConfig.filterRules) {
        config.filterRules = config.filterRules.map(rule => {
            const override = overrideConfig.filterRules.find(o => o.ruleId === rule.ruleId);
            return { ...rule, ...override };
        });
    }
    if (overrideConfig.plugins) {
        config.plugins = config.plugins.map(rule => {
            const override = overrideConfig.plugins.find(o => o.pluginId === rule.pluginId);
            return { ...rule, ...override };
        });
    }
};
self.addEventListener('message', (event) => {
    const data = event.data;
    const rules = data.ruleId === undefined
        ? config.rules
        : config.rules.filter(rule => rule.ruleId === data.ruleId);
    switch (data.command) {
        case "merge-config":
            return assignConfig(data.config);
        case "lint":
            return kernel.lintText(data.text, {
                rules: rules,
                filterRules: config.filterRules,
                plugins: config.plugins,
                filePath: "/path/to/README" + data.ext,
                ext: data.ext,
            }).then(result => {
                return self.postMessage({
                    command: "lint:result",
                    result
                });
            });
        case "fix":
            return kernel.fixText(data.text, {
                rules: rules,
                filterRules: config.filterRules,
                plugins: config.plugins,
                filePath: "/path/to/README" + data.ext,
                ext: data.ext,
            }).then(result => {
                return self.postMessage({
                    command: "fix:result",
                    result
                });
            });
        default:
            console.log("Unknown command: " + data.command);
    }
});
// ====
self.postMessage({
    command: "init"
});
