export enum EnvEnum {
  Dev = 'dev',
  Test = 'test',
  Slave = 'slave',
  Production = 'production',
}

export const getEnv = (): EnvEnum => {
  let env = EnvEnum.Production;
  const { hostname } = window.location;
  if (/^dev/.test(hostname)) {
    env = EnvEnum.Dev;
  } else if (/^test/.test(hostname)) {
    env = EnvEnum.Test;
  } else if (/^slave/.test(hostname)) {
    env = EnvEnum.Slave;
  } else {
    env = EnvEnum.Production;
  }
  return env;
};

export const env = getEnv();
