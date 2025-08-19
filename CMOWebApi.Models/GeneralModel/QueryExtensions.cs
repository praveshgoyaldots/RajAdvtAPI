using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace CMOWebApi.Models.GeneralModel
{
    public static class QueryExtensions
    {
        //property name wise filter
        public static IQueryable<T> Filter<T>(this IQueryable<T> query, Dictionary<string, string> search)
        {
            var properties = typeof(T).GetProperties();
            var predicate = PredicateBuilder.True<T>();
            if (search != null)
            {
                foreach (var property in properties)
                {
                    foreach (var term in search)
                    {
                        if (term.Key.ToString().Contains("."))
                        {
                            var nestedTableProperty = term.Key.ToString().Split('.');
                            if (nestedTableProperty[0].ToString().ToLower() == property.Name.ToString().ToLower())
                            {
                                if (!string.IsNullOrEmpty(term.Value.Trim()))

                                    try
                                    {
                                        if (!string.IsNullOrEmpty(term.Value.Trim()) && property.PropertyType.GenericTypeArguments.Length>0&&property.PropertyType.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                                        {
                                            predicate = predicate.And(CreateLike<T>(property, term.Key, term.Value.Trim(), false));
                                            predicate = predicate.And(CreateLike<T>(property, term.Key, term.Value.Trim(), true));
                                        }
                                        else
                                        {
                                            predicate = predicate.And(CreateLike<T>(property, term.Key, term.Value.Trim(), null));
                                        }
                                    }
                                    catch
                                    {
                                        predicate = predicate.And(CreateLike<T>(property, term.Key, term.Value.Trim(), null));
                                    }
                            }
                        }
                        else if (property.Name.ToString().ToLower() == term.Key.ToLower())
                        {
                            if (!string.IsNullOrEmpty(term.Value.Trim()))
                            {
                                try
                                {
                                    if (!string.IsNullOrEmpty(term.Value.Trim()) &&property.PropertyType.GenericTypeArguments.Length>0&& property.PropertyType.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                                    {
                                        predicate = predicate.And(CreateLike<T>(false, property, term.Value.Trim()));
                                        predicate = predicate.And(CreateLike<T>(true, property, Convert.ToDateTime(term.Value.Trim()).AddHours(24)));
                                    }
                                    else
                                    {
                                        predicate = predicate.And(CreateLike<T>(null, property, term.Value.Trim()));
                                    }
                                }
                                catch
                                {
                                    predicate = predicate.And(CreateLike<T>(null, property, term.Value.Trim()));
                                }

                            }
                        }
                    }

                }
            }
            return query.AsExpandable().Where(predicate);
        }
        //cretae like or equal query
        private static Expression<Func<T, bool>> CreateLike<T>(bool? dateFactor, PropertyInfo prop, dynamic value)
        {
            Type t = prop.PropertyType;
            var parameter = Expression.Parameter(typeof(T), "f");
            var propertyAccess = Expression.MakeMemberAccess(parameter, prop);
            ConstantExpression equalQuery = null;
            try
            {
                if (t.Name.ToLower() == "boolean")
                    equalQuery = Expression.Constant(Convert.ToBoolean(value), typeof(bool));
                else if (t.Name.ToLower().Contains("int16"))
                    equalQuery = Expression.Constant(Convert.ToInt32(value), typeof(int));
                else if (t.Name.ToLower().Contains("int32"))
                    equalQuery = Expression.Constant(Convert.ToInt32(value), typeof(int));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                    equalQuery = Expression.Constant(Convert.ToDateTime(value), typeof(DateTime));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("decimal"))
                    equalQuery = Expression.Constant(Convert.ToDecimal(value), typeof(decimal));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int64"))
                    equalQuery = Expression.Constant(Convert.ToInt64(value), typeof(long));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int"))
                    equalQuery = Expression.Constant(Convert.ToInt32(value), typeof(int));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("guid"))
                    equalQuery = Expression.Constant(new Guid(value), typeof(Guid));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("boolean"))
                    equalQuery = Expression.Constant(Convert.ToBoolean(value), typeof(bool));

            }
            catch
            {
                var like = Expression.Call(propertyAccess, "Contains", null, Expression.Constant(value, typeof(string)));
                return Expression.Lambda<Func<T, bool>>(like, parameter);
            }
            BinaryExpression binaryExpression = null;
            if (dateFactor == true)
            {
                binaryExpression = ReturnDateComparissionLessthenEqualTo(propertyAccess, equalQuery);
            }
            else if (dateFactor == false)
            {
                binaryExpression = ReturnDateComparissionGreaterthenEqualTo(propertyAccess, equalQuery);
            }
            else
            {
                binaryExpression = Expression.Equal(propertyAccess, Expression.Convert(equalQuery, propertyAccess.Type));
            }
            Expression<Func<T, bool>> expression = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
            return expression;
        }
        //cretae less then equal to query for date
        public static BinaryExpression ReturnDateComparissionLessthenEqualTo(MemberExpression propertyAccess, ConstantExpression equalQuery)
        {
            return Expression.LessThan(propertyAccess, Expression.Convert(equalQuery, propertyAccess.Type));
        }
        //cretae greater then equal to query for date
        public static BinaryExpression ReturnDateComparissionGreaterthenEqualTo(MemberExpression propertyAccess, ConstantExpression equalQuery)
        {
            return Expression.GreaterThanOrEqual(propertyAccess, Expression.Convert(equalQuery, propertyAccess.Type));
        }
        //cretae like or equal query
        private static Expression<Func<T, bool>> CreateLike<T>(PropertyInfo property, string actualProperty, dynamic value, bool? dateFactor)
        {
            var propertyAccess = (dynamic)null;
            var parameter = Expression.Parameter(typeof(T), "f");
            if (actualProperty.Contains("."))
            {
                propertyAccess = NestedExpressionProperty(parameter, actualProperty);
            }
            Assembly assembly = Assembly.GetAssembly(typeof(T));
            Type typeData = assembly.GetType(((property.PropertyType)).FullName);
            var typeDataTemp = typeData.GetProperties();
            var propertiesDetails = actualProperty.Split('.');
            Type t = (dynamic)null;

            for (int i = 1; i <= propertiesDetails.Length - 1; i++)
            {
                foreach (PropertyInfo prope in typeDataTemp)
                {
                    if (prope.Name.ToLower() == propertiesDetails[i].ToLower() && prope.PropertyType.IsClass)
                    {
                        if (assembly.GetType(((prope.PropertyType)).FullName) != null)
                        {
                            typeDataTemp = assembly.GetType(((prope.PropertyType)).FullName).GetProperties();
                        }
                        break;
                    }
                    else if (prope.Name.ToLower() == propertiesDetails[i].ToLower())
                    {
                        t = prope.PropertyType;
                    }
                }
            }

            ConstantExpression equalQuery = null;
            try
            {
                if (t.Name.ToLower() == "boolean")
                    equalQuery = Expression.Constant(Convert.ToBoolean(value), typeof(bool));
                else if (t.Name.ToLower().Contains("int16"))
                    equalQuery = Expression.Constant(Convert.ToInt32(value), typeof(int));
                else if (t.Name.ToLower().Contains("int32"))
                    equalQuery = Expression.Constant(Convert.ToInt32(value), typeof(int));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                    equalQuery = Expression.Constant(Convert.ToDateTime(value), typeof(DateTime));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("decimal"))
                    equalQuery = Expression.Constant(Convert.ToDecimal(value), typeof(decimal));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int64"))
                    equalQuery = Expression.Constant(Convert.ToInt64(value), typeof(long));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int"))
                    equalQuery = Expression.Constant(Convert.ToInt32(value), typeof(int));
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("guid"))
                    equalQuery = Expression.Constant(new Guid(value), typeof(Guid));
            }
            catch
            {
                var like = Expression.Call(propertyAccess, "Contains", null, Expression.Constant(value, typeof(string)));
                return Expression.Lambda<Func<T, bool>>(like, parameter);
            }
            BinaryExpression binaryExpression = null;


            if (dateFactor == true)
            {
                binaryExpression = ReturnDateComparissionLessthenEqualTo(propertyAccess, equalQuery);
            }
            else if (dateFactor == false)
            {
                binaryExpression = ReturnDateComparissionGreaterthenEqualTo(propertyAccess, equalQuery);
            }
            else
            {
                binaryExpression = Expression.Equal(propertyAccess, Expression.Convert(equalQuery, propertyAccess.Type));
            }


            Expression<Func<T, bool>> expression = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
            return expression;
        }
        //sorted data based on column
        public static Func<T, object> GetOrderByExpression<T>(string sortColumn)
        {
            Func<T, object> orderByExpr = null;
            if (!String.IsNullOrEmpty(sortColumn))
            {
                Type sponsorResultType = typeof(T);

                if (sponsorResultType.GetProperties().Any(prop => prop.Name == sortColumn))
                {
                    System.Reflection.PropertyInfo pinfo = sponsorResultType.GetProperty(sortColumn);
                    orderByExpr = (data => pinfo.GetValue(data, null));
                }
            }
            return orderByExpr;
        }
        //sorted data based on nested column
        public static Expression<Func<TEntity, TResult>> GetExpression<TEntity, TResult>(string propertyName)
        {
            var paramExpression = Expression.Parameter(typeof(TEntity), "x");
            string[] parts = propertyName.Split('.');
            int partsL = parts.Length;

            var expressionBuild = (partsL > 1)
                ?
                Expression.Property(
                    NestedExpressionProperty(
                        paramExpression,
                        parts.Take(partsL - 1)
                            .Aggregate((a, i) => a + "." + i)), parts[partsL - 1]) :
                Expression.Property(paramExpression, propertyName);
            //return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(DateTime)), paramExpression);


            Assembly assembly = Assembly.GetAssembly(typeof(TEntity));
            Type typeData = typeof(TEntity);
            var typeDataTemp = typeData.GetProperties();
            var propertiesDetails = propertyName.Split('.');
            Type t = (dynamic)null;

            for (int i = 0; i <= propertiesDetails.Length - 1; i++)
            {
                foreach (PropertyInfo prope in typeDataTemp)
                {
                    if (prope.Name.ToLower() == propertiesDetails[i].ToLower() && prope.PropertyType.IsClass)
                    {
                        try
                        {
                            t = prope.PropertyType;
                        }
                        catch { }

                        if (assembly.GetType(((prope.PropertyType)).FullName) != null)
                        {
                            typeDataTemp = assembly.GetType(((prope.PropertyType)).FullName).GetProperties();
                            break;
                        }
                    }
                    else if (prope.Name.ToLower() == propertiesDetails[i].ToLower())
                    {
                        t = prope.PropertyType;
                    }
                }
            }

            try
            {
                if (t.Name.ToLower() == "boolean")
                    return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(bool)), paramExpression);
                else if (t.Name.ToLower().Contains("int32"))
                    return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(int)), paramExpression);
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                    return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(DateTime)), paramExpression);
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("decimal"))
                    return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(decimal)), paramExpression);
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int64"))
                    return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(long)), paramExpression);
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int"))
                    return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(int)), paramExpression);
                else if (t.GenericTypeArguments[0].Name.ToLower().Contains("guid"))
                    return Expression.Lambda<Func<TEntity, TResult>>(Expression.Convert(expressionBuild, typeof(int)), paramExpression);
            }
            catch
            {
                return Expression.Lambda<Func<TEntity, TResult>>(expressionBuild, paramExpression);
            }
            return Expression.Lambda<Func<TEntity, TResult>>(expressionBuild, paramExpression);
        }
        //create nested expression
        public static MemberExpression NestedExpressionProperty(Expression expression, string propertyName)
        {
            string[] parts = propertyName.Split('.');
            int partsL = parts.Length;

            return (partsL > 1)
                ?
                Expression.Property(
                    NestedExpressionProperty(
                        expression,
                        parts.Take(partsL - 1)
                            .Aggregate((a, i) => a + "." + i)), parts[partsL - 1]) :
                Expression.Property(expression, propertyName);
        }
    }
}
