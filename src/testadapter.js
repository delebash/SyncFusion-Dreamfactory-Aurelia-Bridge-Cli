

export class TestAdapter{

    static getadapter() {
      const syncfusiondmSymbols = {};
      syncfusiondmSymbols.operatorSymbols = {
        "=": "equal",
        "is not null": "notnull",
        "is null": "isnull",
        "is not in": "notin",
        "is in": "in"
      };

      ej.data.fnOperators.like = (actual, expected, ignoreCase) => {
        if (ignoreCase)
          return (actual) && "LIKE" && (expected);

        return actual > expected;
      };
      ej.data.fnOperators.notin = (actual, expected, ignoreCase) => {
        if (ignoreCase)
          return (actual) && "NOT IN " && (expected);

        return actual > expected;
      };

      ej.data.fnOperators.in = (actual, expected, ignoreCase) => {
        if (ignoreCase)
          return (actual) && "IN" && (expected);

        return actual > expected;
      };

      $.extend(ej.data.operatorSymbols, syncfusiondmSymbols.operatorSymbols);
      var isNull = function (val) {
        return val === undefined || val === null;
      };
   //   var syncfusionDreamFactoryAdapter;
      var syncfusionDreamFactoryAdapter = new ej.ODataAdaptor().extend({
        options: {
          from: "table",
          requestType: "json",
          sortBy: "order",
          select: "fields",
          skip: "skip",
          group: "group",
          take: "limit",
          search: "search",
          count: "count",
          where: "filter",
          aggregates: "aggregates"
        },
        dreamFactoryodBiOperator: {
          "<": " < ",
          ">": " > ",
          "<=": " <= ",
          ">=": " >= ",
          "==": " = ",
          "=": " = ",
          "!=": " != ",
          "lessthan": " < ",
          "lessthanorequal": " <= ",
          "greaterthan": " > ",
          "greaterthanorequal": " >= ",
          "equal": " = ",
          "notequal": " != ",
          "like": " LIKE ",
          "notnull": " IS NOT NULL ",
          "isnull": " IS NULL",
          "IS NOT NULL": " IS NOT NULL ",
          "IS NULL": " IS NULL ",
          "contains": " CONTAINS ",
          "endswith": " ENDS WITH ",
          "startswith": " STARTS WITH "
        },
        dreamFactoryUniOperator: {
          "in": " IN ",
          "notin": " NOT IN ",
          "IS NOT IN": " IS NOT IN ",
          "IS IN": " IS IN "
        },
        onPredicate(pred, query, requiresCast) {
          //   query._fromTable ="contact"
          let returnValue = "";

          let operator;
          let guid;
          let val = pred.value;
          const type = typeof val;
          const field = this._p(pred.field);
          //field = field.replace(/^(|\)$/g, '');
          if (val instanceof Date) {
            val = `datetime'${p.replacer(val).toJSON()}'`;
          }

          operator = this.dreamFactoryodBiOperator[pred.operator];
          if (operator) {
            returnValue += field;
            returnValue += operator;
            if (guid)
              returnValue += guid;
            return returnValue + val;
          }

          operator = this.dreamFactoryUniOperator[pred.operator];

          if (!operator || type !== "string") return "";

          returnValue += field;
          returnValue += `${operator}(`;

          if (guid) returnValue += guid;
          returnValue += `${val})`;

          return returnValue
        },
        processResponse(data, ds, query, xhr, request, changes) {
          let count = null;
          const aggregateResult = {};

          if (query && query._requiresCount) {
            if (data.meta) count = data.meta.count;
          }

          data = data.resource;
          return isNull(count) ? data : {result: data, count};
        },
        onCount(e) {
          return e === true ? true : "";
        },
        beforeSend(dm, request, settings) {
          let table = "";
          let count = "";
          const data = ej.parseJSON(settings.data);

          if (data.table)
            table = data.table;
          if (data.count === true) {
            delete data.count;
            count = 'include_count=true';
          }
          settings.contentType = "application/json; charset=utf-8";
          settings.url = `${settings.url + table}?method=GET&${count}`;

          delete data.params;
          delete data.requiresCounts;
          settings.data = JSON.stringify(data)
        }

      });
      return syncfusionDreamFactoryAdapter
    }

}

