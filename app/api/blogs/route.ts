import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/BlogModel";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all";
    const userId = searchParams.get("userId");

    const query: any = {};
    if (status !== "all") query.status = status;
    if (userId) query.userId = userId;

    const blogs = await BlogModel.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName email");

    // ✅ Calculate stats
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const totalBlogs = blogs.length;
    const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);
    const avgReadTime =
      totalBlogs > 0
        ? Math.round(
            blogs.reduce((acc, b) => acc + (b.readTime || 0), 0) / totalBlogs
          )
        : 0;

    // ✅ Fetch last month’s blogs for comparison
    const lastMonthBlogs = await BlogModel.find({
      createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth },
    });

    const lastMonthViews = lastMonthBlogs.reduce(
      (acc, b) => acc + (b.views || 0),
      0
    );
    const lastMonthAvgRead =
      lastMonthBlogs.length > 0
        ? Math.round(
            lastMonthBlogs.reduce((acc, b) => acc + (b.readTime || 0), 0) /
              lastMonthBlogs.length
          )
        : 0;

    // ✅ Calculate percentage change
    const calcPercentChange = (curr: number, prev: number) => {
      if (prev === 0) return curr > 0 ? 100 : 0;
      return Math.round(((curr - prev) / prev) * 100);
    };

    const stats = {
      totalBlogs,
      totalViews,
      avgReadTime,
      change: {
        blogs: calcPercentChange(totalBlogs, lastMonthBlogs.length),
        views: calcPercentChange(totalViews, lastMonthViews),
        readTime: calcPercentChange(avgReadTime, lastMonthAvgRead),
      },
    };

    return NextResponse.json({ success: true, blogs, stats });
  } catch (err: any) {
    console.error("❌ Error fetching blogs:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// POST: create a new blog (admin only)
// In app/api/blogs/route.ts

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Check authentication
    const { user, error } = await verifyToken(req);
    if (error || !user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    // ✅ Only admin or authorized roles can create blogs
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Access denied. Admins only." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, excerpt, content, status } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, excerpt, and content are required.",
        },
        { status: 400 }
      );
    }

    const blog = await BlogModel.create({
      title,
      excerpt,
      content,
      status: status || "draft",
      userId: user._id,
      publishedDate:
        status === "published" || status === "live" ? new Date() : null,
    });

    return NextResponse.json({
      success: true,
      message: "✅ Blog created successfully.",
      blog,
    });
  } catch (err: any) {
    console.error("❌ Blog creation error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// PATCH: update blog status, soft-delete, restore
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action"); // "delete" | "restore" | "status"

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required." },
        { status: 400 }
      );
    }
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }
    const body = await req.json();

    // 🧠 Handle status update
    if (body.status) {
      const validStatuses = [
        "draft",
        "published",
        "archived",
        "blocked",
        "live",
      ];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { success: false, message: "Invalid status value." },
          { status: 400 }
        );
      }
      blog.status = body.status;
      if (["published", "live"].includes(body.status)) {
        blog.publishedDate = new Date();
      }
    }

    // 🧠 Handle other editable fields
    if (body.title) blog.title = body.title;
    if (body.excerpt) blog.excerpt = body.excerpt;
    if (body.content) blog.content = body.content;

    // 🧠 Save all updates
    await blog.save();

    return NextResponse.json({
      success: true,
      message: "✅ Blog updated successfully.",
      blog,
    });
  } catch (err: any) {
    console.error("❌ Blog update error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// DELETE: hard delete a blog (admin only)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required." },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog permanently deleted.",
      blog,
    });
  } catch (err: any) {
    console.error("❌ Blog delete error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
