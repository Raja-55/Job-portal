import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    // sanitize and parse salary and experience to numbers
    const parseSalary = (val) => {
      if (val == null) return null;
      if (typeof val === "number" && !isNaN(val)) return val;
      let str = String(val).trim().toLowerCase();
      str = str.replace(/,/g, "");
      // split ranges like "10-15k" or "10 – 15k"
      const parts = str
        .split(/[\-–—to]+/)
        .map((p) => p.trim())
        .filter(Boolean);
      const candidate = parts.length ? parts[0] : str;
      let multiplier = 1;
      if (candidate.endsWith("k")) {
        multiplier = 1000;
        str = candidate.replace(/k$/, "");
      } else if (candidate.endsWith("m")) {
        multiplier = 1000000;
        str = candidate.replace(/m$/, "");
      } else str = candidate;
      const num = parseFloat(str);
      if (isNaN(num)) return null;
      return num * multiplier;
    };

    const parseExperience = (val) => {
      if (val == null) return null;
      if (typeof val === "number" && !isNaN(val)) return Math.floor(val);
      const s = String(val);
      // extract first number from strings like "0–1 year" or "2 years"
      const m = s.match(/-?\d+(?:\.\d+)?/);
      if (!m) {
        // map some common labels
        const lower = s.toLowerCase();
        if (lower.includes("fresher") || lower.includes("entry")) return 0;
        return null;
      }
      return Math.floor(Number(m[0]));
    };

    const parsedSalary = parseSalary(salary);
    const parsedExperience = parseExperience(experience);
    if (parsedSalary == null || isNaN(parsedSalary)) {
      return res
        .status(400)
        .json({ message: "Invalid salary format", success: false });
    }
    if (parsedExperience == null || isNaN(parsedExperience)) {
      return res
        .status(400)
        .json({ message: "Invalid experience format", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: parsedSalary,
      location,
      jobType,
      experienceLevel: parsedExperience,
      position: Number(position),
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// student k liye
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
