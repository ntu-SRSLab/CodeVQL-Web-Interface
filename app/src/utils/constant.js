export const RegressionTestSelectionQuery = `import java

from Insert ins, Update upd, MethodAccess ma, Method m, Containment ct, Class cl
range ins @ vChange, upd @ vChange, ma @ vNew, m @ vNew, ct @ vNew, cl @ vNew
where exists (ins, upd, ma, m, ct, cl that
             (ma.getCallee+() = ins or ma.getCallee+() = upd) and
              ma.getCaller() = m and
              ct.getContainee+() = ma.getCaller+() and
              ct.getContainer() = cl and
              cl.isTestClass())
select cl.getOuterClass() as selectedTest 

define vNew ("419a052c6842192e78f747d9f5af619c2ca56e78") 
define vChange ("419a052c6842192e78f747d9f5af619c2ca56e78".."6c9d06a658d87c01fb02d1efce15bf6b74eb7aab") 
`;

export const CalleeChangedQuery = `import java

from MethodAccess old, MethodAccess new, Method method
range old @ v1, new @ v2, method @ v3
where exists (old, new, method that 
              old.getCaller() != new.getCaller() and
              old.getCallee() = method.fqn() and method.getName() = "getAuth" and method.getClassName() = "io.fabric8.maven.docker.access.AuthConfig" and
              new.getCallee() = method.fqn() and method.getName() = "getAuth" and method.getClassName() = "io.fabric8.maven.docker.access.AuthConfig")
select new

define v1 ("e7fefdaddd99294d5842ef8c5b16070ce230d29e~1".."e7fefdaddd99294d5842ef8c5b16070ce230d29e~11")
define v2 "e7fefdaddd99294d5842ef8c5b16070ce230d29e"
define v3 ("e7fefdaddd99294d5842ef8c5b16070ce230d29e".."e7fefdaddd99294d5842ef8c5b16070ce230d29e~11")
`;

export const MethodUnusedQuery = `import java

from MethodAccess accessV1, MethodAccess accessV2, Method method
range accessV1 @ v1, accessV2 @ v2, method @ v3
where exists (accessV1 that accessV1.getCaller()=method.fqn() and method.getName() = "*")
and not exist (accessV2 that accessV2.getCaller()=method.fqn() and method.getName() = "*")
select method

define v1 ("e7fefdaddd99294d5842ef8c5b16070ce230d29e~1".."e7fefdaddd99294d5842ef8c5b16070ce230d29e~5")
define v2 "e7fefdaddd99294d5842ef8c5b16070ce230d29e"
define v3 ("e7fefdaddd99294d5842ef8c5b16070ce230d29e".."e7fefdaddd99294d5842ef8c5b16070ce230d29e~5")
`;
