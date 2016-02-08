# Seneca state machine plugin sample

![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

Sample that demonstrates the usage of seneca state machine.

Beside changing states the sample also demonstrates event generation, a `save` command is issued `after` each state change.


```
                                                       [review()]
                                                ----<--------<-----<----
      [create()]               [review()]       |       [approve()]     |         [schedule()]
CREATE---------->TRIAGE_CONTENT---------->REVIEW_CONTENT---------->CONTENT_APPROVED----------->CONTENT_SCHEDULED
```

The states are configured in the `smconfig.js`. There are 5 states defined: `CREATE, TRIAGE_CONTENT, REVIEW_CONTENT, CONTENT_APPROVED, CONTENT_SCHEDULED`. For each state a command to change state is defined. 

After each state change an `after` hook is defined, this hook executes the `role: content, context: document, cmd: save` seneca action.

## How to run

```js
node index.js
```
