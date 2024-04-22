import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import StickyNavbar from "./Navbar";

function Info({ user }) {
  return (
    <>
      <StickyNavbar user={user} />
      <div className="flex flex-row pt-20 gap-x-10">
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Age
            </Typography>
            <Typography>The age of the patient.</Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Gender
            </Typography>
            <Typography>The gender of the patient.</Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Smoking
            </Typography>
            <Typography>If the patient was a current smoker or not.</Typography>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-row pt-20 gap-x-10">
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Hx Smoking
            </Typography>
            <Typography>If the patient smoked in the past.</Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Hx Radiothreapy
            </Typography>
            <Typography>
              If the patient has had radiation therapy to the head and neck
              region.
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Thyroid Function
            </Typography>
            <Typography>
              Whether the patient's thyroid was working properly. More in-depth
              information can be found-
              <a
                href="https://my.clevelandclinic.org/health/body/23188-thyroid"
                target="_blank"
              >
                here.
              </a>
            </Typography>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-row pt-20 gap-x-10">
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Physical Examination
            </Typography>
            <Typography>
              The presence of a goiter and which type it is. A goiter is a
              swelling in the neck resulting from an enlarged thyroid gland.
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Adenopathy
            </Typography>
            <Typography>
              Presence of adenopathy on the physical examination. Adenopathy
              refers to swollen glands, such as the lymph nodes.
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Pathology
            </Typography>
            <Typography>
              Pathological subtype of cancer, so which type of cancer that the
              patient had in the past.
            </Typography>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-row pt-20 gap-x-10">
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Focality
            </Typography>
            <Typography>
              This means whether the cancer was present in one location
              (unifocal) or in multiple places (multifocal).
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Risk
            </Typography>
            <Typography>
              Risk assessment according to{" "}
              <a
                href="https://www.thyroid.org/professionals/ata-professional-guidelines/"
                target="_blank"
              >
                ATA (American Thyroid Association) guidelines. So, how dangerous
                the initial cancer was.
              </a>
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              T, N, M, Stage
            </Typography>
            <Typography>
              TNM staging this is a globally recognised standard for classifying
              the anatomical extent of the spread of malignant tumours (cancer).
            </Typography>
            <Typography>
              N describes nearby (regional) lymph nodes that are involved.
            </Typography>
            <Typography>
              T describes the size of the original (primary) tumor and whether
              it has invaded nearby tissue.
            </Typography>
            <Typography>
              {" "}
              M describes distant metastasis (spread of cancer from one part of
              the body to another).
            </Typography>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-row pt-20 gap-x-10">
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Response
            </Typography>
            <Typography>
              Initial treatment response to the cancer the patient had in the
              past. (excellent, biochemical incomplete, structurally incomplete,
              indeterminate)
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Recurred
            </Typography>
            <Typography>
              Whether the cancer has recurred for a second time or not.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default Info;
