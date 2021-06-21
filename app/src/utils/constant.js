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
              old.getCallee() = method.fqn() and method.getName() = "getArea" and method.getClassName() = "src.main.java.model.Circle" and
              new.getCallee() = method.fqn() and method.getName() = "getArea" and method.getClassName() = "src.main.java.model.Circle")
select new

define v1 "df03a3fe2454f15abc652adb9b0e50d7238291ae"
define v2 "32579f9d4e913a9776a53904b996a654c3ca8322"
define v3 ("df03a3fe2454f15abc652adb9b0e50d7238291ae", "32579f9d4e913a9776a53904b996a654c3ca8322")
`;

export const MethodUnusedQuery = `import java

from MethodAccess accessV1, MethodAccess accessV2, Method method
range accessV1 @ v1, accessV2 @ v2, method @ v3
where exists (accessV1 that accessV1.getCallee()=method.fqn() and method.getName() = "*")
and not exist (accessV2 that accessV2.getCallee()=method.fqn() and method.getName() = "*")
select method

define v1 "32579f9d4e913a9776a53904b996a654c3ca8322"
define v2 "f8e32c64a58c1b6d00abfe9398efe045fb5522ea"
define v3 ("32579f9d4e913a9776a53904b996a654c3ca8322", "f8e32c64a58c1b6d00abfe9398efe045fb5522ea")
`;
