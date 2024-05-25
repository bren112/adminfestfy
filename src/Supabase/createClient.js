import {createClient} from "@supabase/supabase-js";

export const supabase= createClient(
    "https://gbdxqcjfpusbgiryvarp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZHhxY2pmcHVzYmdpcnl2YXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzOTUyMTYsImV4cCI6MjAzMTk3MTIxNn0.p2UU3A5n0Y3m5c9ZP2BjviE306eQ6PGMg4Disqjb_DI"
    )