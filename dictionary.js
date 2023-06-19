// Útil
function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
// Dicionário
module.exports = class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  // Verifica se Key está presente
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  // Adicionar ou atualizar valores
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  // Remove/Deleta(Remove Key(string))
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  //Buscar Key e exibir seu valor
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  // Retorna um array com todos os os pares
  keyValues() {
    const valuePair = [];
    for (const k in this.table) {
      if (this.hasKey(k)) {
        valuePair.push(this.table[k]);
      }
    }
    return valuePair;
  }
  // Retorna todas as chaves contidas no dicionário
  keys() {
    return this.keyValues().map((valuePair) => valuePair.key);
  }
  // Retorna todos os valores contidos no dicionário
  value() {
    return this.keyValues().map((valuePair) => valuePair.value);
  }
  // Percorre os valores armazenados
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }
  size() {
    return Object.keys(this.table).length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  clear() {
    this.table = {};
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
};




