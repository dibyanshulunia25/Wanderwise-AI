import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args:{
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        //check if user already exists
        const user = await ctx.db.query("UserTable").filter((q) => q.eq(q.field("email"), args.email)).collect();

        if(user?.length == 0){
            const newUser = await ctx.db.insert("UserTable", args);
            return newUser;
        }

        return user[0];
    }
})