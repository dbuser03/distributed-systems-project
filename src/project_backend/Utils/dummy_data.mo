import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
    public type ThreadSeed = {
        title : Text;
        abstract : Text;
        body : Text;
        tags : [Text];
        comments : [Text];
        likes : Nat;
        dislikes : Nat;
    };

    public let threads : [ThreadSeed] = [
        {
            title = "Internal Audit Flags Suppressed Safety Report";
            abstract = "A leak suggests a safety review was withheld from staff and regulators.";
            body = "An internal audit draft allegedly identified critical design flaws in a warehouse automation system. Several employees claim the final version removed key warnings before external submission. The discrepancy raises questions about procedural transparency and whether decision-makers intentionally minimized risk indicators.";
            tags = ["US", "A"];
            comments = [
                "If the discrepancy is real, the auditors should have a paper trail.",
                "Hard to believe the omissions were accidental—too specific.",
            ];
            likes = 42;
            dislikes = 6;
        },
        {
            title = "Concern Over Data Retention Beyond Policy Limits";
            abstract = "Former analyst says customer logs were kept longer than compliance rules allowed.";
            body = "A data team employee reported that archived traffic logs were maintained for years past the retention window defined in internal policy. Leadership allegedly argued that the logs were 'harmless metadata,' but the datasets contained device identifiers that could enable long-term profiling. No official response from the company has surfaced.";
            tags = ["GB", "C"];
            comments = [
                "Retention creep happens when no one enforces the rules.",
                "Profiling risk seems substantial if identifiers were intact.",
                "Regulators will ask why the policy existed if it wasn't followed.",
            ];
            likes = 57;
            dislikes = 10;
        },
        {
            title = "Quality Control Team Pressured to Alter Test Results";
            abstract = "QC technicians allege they were asked to reclassify borderline failures as acceptable.";
            body = "A manufacturing plant's QC staff say chronic throughput pressure led supervisors to reinterpret test thresholds. Borderline failure readings were reportedly placed in a 'conditional pass' category created without engineering approval. Longstanding concerns about product reliability appear linked to this informal practice.";
            tags = ["DE", "B"];
            comments = [
                "Creating new categories outside formal standards is a massive red flag.",
                "Engineering oversight should never be bypassed.",
            ];
            likes = 33;
            dislikes = 4;
        },
        {
            title = "Undisclosed Outsourcing of Sensitive Review Tasks";
            abstract = "Employees claim critical compliance reviews were sent to an unvetted vendor.";
            body = "According to internal emails, a resource-strapped compliance division outsourced document screening to a contractor overseas without updating the risk assessment. Staff say they discovered inconsistencies in the contractor's work and noted missing confidentiality agreements. Management refused to halt the outsourcing.";
            tags = ["IN", "ES"];
            comments = [
                "Lack of confidentiality agreements is astonishing.",
                "Resource constraints don't justify skipping due diligence.",
            ];
            likes = 21;
            dislikes = 3;
        },
        {
            title = "Environmental Impact Figures Allegedly Re-Modeled";
            abstract = "A technical specialist reports pressure to adopt optimistic estimates in emissions models.";
            body = "An emissions modeling tool reportedly produced results showing the company exceeded its internal environmental targets. Reviewers allegedly pushed for alternate assumptions that reduced projected output without new evidence. The specialist claims the pressure centered on securing favorable publicity.";
            tags = ["FR", "OTHER"];
            comments = [
                "Models shouldn't be tuned for PR, only accuracy.",
                "Assumption changes need documented justification.",
            ];
            likes = 48;
            dislikes = 7;
        },
        {
            title = "Procurement Exceptions Quietly Expanded";
            abstract = "Sources say high-value purchases were approved under a loophole meant for emergencies.";
            body = "A procurement officer observed repeated use of an 'exceptional authorization' pathway for routine purchases. The clause was intended strictly for crisis scenarios but became an informal workaround to skip competitive bidding. The officer reported the pattern but received no acknowledgement.";
            tags = ["NL", "A"];
            comments = [
                "Skipping bids almost always undermines cost controls.",
                "Emergency channels should never become standard practice.",
            ];
            likes = 29;
            dislikes = 5;
        },
        {
            title = "Workplace Injury Reports Marked as “Non-Recordable”";
            abstract = "A facilities worker claims injuries requiring treatment were classified improperly.";
            body = "Several staff members allege that supervisors reclassified on-site injuries to avoid reporting thresholds. Instances involving sprains and equipment mishaps were documented internally but logged as minor incidents, despite employees seeking medical evaluation.";
            tags = ["AU", "U"];
            comments = [
                "Misclassification compromises both safety data and worker trust.",
                "If medical treatment was required, it's absolutely recordable.",
            ];
            likes = 36;
            dislikes = 8;
        },
        {
            title = "Hidden Error Rates in Automated Screening System";
            abstract = "Developer claims the system's false-positive rate was understated in briefings.";
            body = "A developer reports that internal metrics showed the algorithm misflagging nearly 9% of benign entries. Senior leadership allegedly preferred to present an 'effective rate' based on a narrower sample that excluded edge cases. The developer argues that policymakers were given an incomplete picture.";
            tags = ["CA", "JP"];
            comments = [
                "Edge cases are part of real deployment—you can't exclude them.",
                "Understated error rates distort governance decisions.",
            ];
            likes = 61;
            dislikes = 9;
        },
        {
            title = "Financial Controls Bypassed for Accelerated Payments";
            abstract = "Finance team member said dual-approval requirements were quietly suspended.";
            body = "When a major partner threatened delays, leadership allegedly instructed staff to release payments without secondary sign-off. The temporary measure became a long-term practice, and attempts to revert to standard controls were met with resistance.";
            tags = ["BE", "IT"];
            comments = [
                "Dual approval exists precisely to prevent long-term drift.",
                "Temporary exceptions need sunset clauses.",
            ];
            likes = 24;
            dislikes = 2;
        },
        {
            title = "Internal Survey Results Withheld From Workforce";
            abstract = "Staff claim morale and burnout data never reached the promised transparency portal.";
            body = "An employee familiar with the reporting workflow stated that survey results showed significantly higher burnout rates than leadership expected. The results were never posted to the internal dashboard, despite earlier commitments to transparency. Several teams say this omission erodes trust.";
            tags = ["ZA", "NG"];
            comments = [
                "Withholding morale data signals deeper cultural issues.",
                "If the numbers are bad, you fix the causes—not hide them.",
            ];
            likes = 39;
            dislikes = 6;
        },
        {
            title = "Security Team Warned About Shared Admin Credentials";
            abstract = "Engineer alleges shared admin accounts were kept despite repeated warnings.";
            body = "A security engineer reports that high-privilege accounts were shared among multiple staff members for 'operational convenience.' Attempts to introduce individual accounts with proper logging were dismissed as too disruptive. The engineer fears this setup could obscure responsibility if a breach occurs.";
            tags = ["US", "D"];
            comments = [
                "Shared admin accounts are basically an invitation to abuse.",
                "Auditability is impossible if everyone logs in as the same user.",
            ];
            likes = 44;
            dislikes = 5;
        },
        {
            title = "Product Safety Concerns Downplayed in Launch Deck";
            abstract = "Designer says early hazard reports vanished from final product presentation.";
            body = "During pre-launch reviews, a design team raised concerns about sharp edges and overheating under heavy use. According to a whistleblower, these issues appeared in draft decks but were removed from the final executive presentation. The justification cited 'avoiding confusion' for non-technical stakeholders.";
            tags = ["CA", "ES"];
            comments = [
                "If the execs can't handle risk information, that's a governance failure.",
                "You don't remove safety concerns; you highlight mitigations.",
            ];
            likes = 31;
            dislikes = 7;
        },
        {
            title = "Unpaid Overtime Treated as “Team Spirit”";
            abstract = "Employee claims chronic unpaid overtime was normalized through cultural pressure.";
            body = "A staff member reports that project leads routinely scheduled work beyond contracted hours, framing it as 'voluntary extra effort.' Those who pushed back allegedly received lower performance ratings. Payroll records show a pattern of capped overtime entries despite known weekend work.";
            tags = ["GB", "F"];
            comments = [
                "Labeling unpaid overtime as 'culture' is exploitation.",
                "Performance systems tied to overwork are structurally coercive.",
                "Regulators often look for exactly this kind of pattern.",
            ];
            likes = 53;
            dislikes = 12;
        },
        {
            title = "Misuse of 'Beta' Label to Avoid Accountability";
            abstract = "Developer alleges the beta tag was used to excuse known defects in production.";
            body = "An engineer claims that a widely deployed feature was officially labeled 'beta' solely to deflect complaints about reliability. Internally, the feature was treated as fully launched, with revenue targets attached. Users had no realistic alternative, making the beta label functionally meaningless.";
            tags = ["AU", "A"];
            comments = [
                "Calling production software 'beta' to dodge responsibility is deceptive.",
                "If you're monetizing it, you own the consequences.",
            ];
            likes = 27;
            dislikes = 4;
        },
        {
            title = "Algorithmic Bias Report Ignored in Hiring Tool";
            abstract = "Data scientist says bias analysis showing skewed outcomes was not escalated.";
            body = "A bias audit allegedly revealed significant disparities in callback rates for candidate groups when using an automated screening tool. According to the whistleblower, management asked for 'alternative visualizations' and then dropped the topic after no cosmetic fix could hide the pattern.";
            tags = ["DE", "IN"];
            comments = [
                "Once you see bias metrics like that, ignoring them is a deliberate choice.",
                "Changing the chart doesn't change the underlying discrimination.",
            ];
            likes = 68;
            dislikes = 11;
        },
        {
            title = "Customer Complaints Reclassified to Improve NPS";
            abstract = "Support agents allege serious issues were downgraded to 'feedback' in reports.";
            body = "Support staff describe a manual recoding exercise where tickets involving outages and data loss were relabeled as 'feature suggestions' before quarterly metrics were compiled. This reportedly boosted net promoter scores on internal dashboards while leaving root causes unresolved.";
            tags = ["FR", "BR"];
            comments = [
                "Manipulating labels to inflate NPS defeats the entire metric.",
                "This will backfire when churn data eventually catches up.",
            ];
            likes = 40;
            dislikes = 6;
        },
        {
            title = "Vendor Risk Assessment Backdated After Incident";
            abstract = "Compliance officer claims a risk assessment document was created post hoc.";
            body = "Following a service disruption at a third-party provider, an internal compliance officer says they discovered a risk assessment was signed and dated prior to the incident—despite no record of review meetings. Metadata from draft files allegedly suggests the document was assembled after the outage.";
            tags = ["NL", "BE"];
            comments = [
                "Backdating compliance paperwork is a serious integrity breach.",
                "If proven, this could undermine the credibility of all prior assessments.",
            ];
            likes = 25;
            dislikes = 3;
        },
        {
            title = "Internal Ethics Hotline Routed Through HR Only";
            abstract = "Insider questions independence of the ethics hotline process.";
            body = "Employees believed that an anonymous ethics line would reach an external ombudsperson. A whistleblower discovered that all reports actually routed through HR, where managers could request 'context' about complaints. Some staff claim retaliation followed shortly after they raised issues.";
            tags = ["ZA", "OTHER"];
            comments = [
                "An ethics line controlled by HR is not truly independent.",
                "Retaliation risk destroys trust in any reporting mechanism.",
            ];
            likes = 37;
            dislikes = 9;
        },
        {
            title = "Health Data Shared with Advertisers Without Clear Consent";
            abstract = "Marketing insider says aggregated health metrics were repurposed for targeting.";
            body = "A marketing team member reports that anonymized but granular health-related usage data from a wellness app was shared with ad partners. While terms of service mentioned 'service improvement,' there was no explicit mention of marketing use. Some internal emails framed this as a 'grey area worth exploiting.'";
            tags = ["CH", "C"];
            comments = [
                "Anonymization is not a magic shield, especially with sensitive data.",
                "If you're debating whether it's consented, it probably isn't.",
            ];
            likes = 59;
            dislikes = 13;
        },
        {
            title = "Safety Drill Logs Fabricated for Regulatory Visit";
            abstract = "Worker claims evacuation drills only occurred on paper.";
            body = "In preparation for an inspection, supervisors allegedly instructed staff to sign attendance sheets for drills that never took place. Some employees were told that 'everyone knows how to exit anyway' and that the paperwork was a mere formality. No real drills were conducted that quarter.";
            tags = ["MX", "U"];
            comments = [
                "Emergency preparedness is not a checkbox exercise.",
                "Falsifying drill records puts everyone at real physical risk.",
            ];
            likes = 46;
            dislikes = 8;
        },
    ];

};
